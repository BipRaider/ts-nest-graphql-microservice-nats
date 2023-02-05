import { Logger } from '@nestjs/common';

import { NatsMicroservice } from '@common/libs';
import { ErrorsLoggerInterceptor } from '@common/interceptor';
import { ENUM } from '@common/interface';

import { UserModule } from './user.module';

async function bootstrap() {
  const logger = new Logger('User');

  const app = await NatsMicroservice(UserModule, { queue: ENUM.NatsServicesQueue.USER });

  app.useGlobalInterceptors(new ErrorsLoggerInterceptor());

  app.listen();
  logger.log('Microservice is listening...');
}
bootstrap();
