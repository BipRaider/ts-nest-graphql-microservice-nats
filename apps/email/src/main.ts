import { Logger } from '@nestjs/common';

import { NatsMicroservice } from '@common/libs';
import { ErrorsLoggerInterceptor } from '@common/interceptor';
import { ENUM } from '@common/interface';

import { EmailModule } from './email.module';

async function bootstrap() {
  const logger = new Logger('Email');
  const app = await NatsMicroservice(EmailModule, { queue: ENUM.NatsServicesQueue.EMAIL });

  app.useGlobalInterceptors(new ErrorsLoggerInterceptor());

  app.listen();
  logger.log('Microservice is listening...');
}
bootstrap();
