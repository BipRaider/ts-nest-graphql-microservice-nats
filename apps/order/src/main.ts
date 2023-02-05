import { Logger } from '@nestjs/common';

import { NatsMicroservice } from '@common/libs';
import { ErrorsLoggerInterceptor } from '@common/interceptor';
import { ENUM } from '@common/interface';

import { OrderModule } from './order.module';

async function bootstrap() {
  const logger = new Logger('Order');

  const app = await NatsMicroservice(OrderModule, { queue: ENUM.NatsServicesQueue.ORDER });

  app.useGlobalInterceptors(new ErrorsLoggerInterceptor());

  app.listen();
  logger.log('Microservice is listening...');
}
bootstrap();
