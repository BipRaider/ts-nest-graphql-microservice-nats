import { NestFactory } from '@nestjs/core';
import { HttpStatus, Logger } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { ValidatePipe } from '@common/pipe';
import { LoggingInterceptor, ErrorsInterceptor } from '@common/interceptor';

const logger: Logger = new Logger('Api');
async function bootstrap(): Promise<void> {
  const port = process.env['GRAPHQL_PORT'] || 3001;

  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.use(cookieParser());
  app.use(helmet());

  app.useGlobalPipes(
    new ValidatePipe({
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
    }),
  );

  app.useGlobalInterceptors(new LoggingInterceptor(), new ErrorsInterceptor());

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  await app.listen(port, async () => {
    logger.log(`Application is running on: ${await app.getUrl()}`);
  });
}

bootstrap();
