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

import { environment } from './environment';
import { ValidatePipe } from '@common/pipe';
import { LoggingInterceptor, ErrorsInterceptor } from '@common/interceptor';

import { AppModule } from './app.module';
import {
  sessionConfig,
  // setupSwagger
} from './configs';
import { ISessionOption } from './environment/environment.interface';
import { AllExceptionsFilter } from './global-exceptions-filter/all-exceptions.filter';
import { useContainer } from 'class-validator';

const logger: Logger = new Logger('Api');
async function bootstrap(): Promise<void> {
  const env = environment();
  const siteUrl: string = env.siteUrl;
  const port = process.env['GRAPHQL_PORT'] || 3001;

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  app.enableCors();

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
  if (port === process.env['GRAPHQL_PORT']) {
    redisClient = new Redis('redis://redis:6379');
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
    logger.log(`Server is running at ${siteUrl}/graphql`);
  });
}

bootstrap();
