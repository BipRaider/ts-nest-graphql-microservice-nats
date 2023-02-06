import { Logger } from '@nestjs/common';

import { NatsMicroservice } from '@common/libs';
import { ErrorsLoggerInterceptor } from '@common/interceptor';
import { ENUM } from '@common/interface';

import { ProductsModule } from './products.module';

async function bootstrap() {
  const logger = new Logger('Product');

  const app = await NatsMicroservice(ProductsModule, { queue: ENUM.NatsServicesQueue.PRODUCT });

  app.useGlobalInterceptors(new ErrorsLoggerInterceptor());

  app.listen();
  logger.log('Microservice is listening...');
}

bootstrap();
