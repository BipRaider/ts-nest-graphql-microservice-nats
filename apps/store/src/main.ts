import { Logger } from '@nestjs/common';

import { NatsMicroservice } from '@common/libs';
import { ErrorsLoggerInterceptor } from '@common/interceptor';
import { ENUM } from '@common/interface';

import { StoreModule } from './store.module';

async function bootstrap() {
  const logger = new Logger('Store');
  const app = await NatsMicroservice(StoreModule, { queue: ENUM.NatsServicesQueue.STORE });

  app.useGlobalInterceptors(new ErrorsLoggerInterceptor());

  app.listen();
  logger.log('Microservice is listening...');
}

bootstrap();
