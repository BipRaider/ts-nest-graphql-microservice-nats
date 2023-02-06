import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { HttpStatus, Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import session from 'express-session';
import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';
import Redis from 'ioredis';
import compression from 'compression';
import { useContainer } from 'class-validator';

import { ValidatePipe } from '@common/pipe';
import { LoggingInterceptor, ErrorsInterceptor } from '@common/interceptor';
import { AllExceptionsFilter } from '@common/filters';
import { ISessionOption } from '@common/interface';
import { envConfig, sessionConfig } from '@common/config';

import { AppModule } from './app.module';

const logger: Logger = new Logger('Api');
async function bootstrap(): Promise<void> {
  const env = envConfig();
  const port = env.server.port;

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  app.use(cookieParser());
  app.use(express.json());

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  if (env.isProduction) {
    app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    app.use(helmet());
    app.use(compression());

    app.use(
      RateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 10_000, // limit each IP to 100 requests per windowMs
      }),
    );
  }

  let redisClient: Redis;
  // // Setup session with redis
  if (port !== env.defPort) {
    const { redis } = env;
    redisClient = new Redis(redis.host);
  } else {
    redisClient = new Redis();
  }

  const sessionEnv: ISessionOption = env.session;
  const sessionOptions = sessionConfig(redisClient, sessionEnv);
  app.use(session(sessionOptions));

  // init 'passport' (npm install passport)
  app.use(passport.initialize());
  app.use(passport.session());

  // Validation
  app.useGlobalPipes(
    new ValidatePipe({
      skipMissingProperties: true,
      transform: true,
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
    }),
  );

  app.useGlobalInterceptors(new LoggingInterceptor(), new ErrorsInterceptor());

  // // Custom exceptions filter
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // setupSwagger(app);

  await app.listen(port, async () => {
    logger.log(`Application is running on: ${await app.getUrl()}/graphql`);
  });
}

bootstrap();
