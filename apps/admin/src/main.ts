import { Logger } from '@nestjs/common';

import { NatsMicroservice } from '@common/libs';
import { ErrorsLoggerInterceptor } from '@common/interceptor';
import { ENUM } from '@common/interface';

import { AdminModule } from './admin.module';

async function bootstrap() {
  const logger = new Logger('Admin');

  const app = await NatsMicroservice(AdminModule, { queue: ENUM.NatsServicesQueue.ADMIN });

  app.useGlobalInterceptors(new ErrorsLoggerInterceptor());

  app.listen();
  logger.log('Microservice is listening...');
}
bootstrap();
