import { Logger } from '@nestjs/common';

import { NatsMicroservice } from '@common/libs';
import { ErrorsLoggerInterceptor } from '@common/interceptor';
import { ENUM } from '@common/interface';

import { ExchequerModule } from './exchequer.module';

async function bootstrap() {
  const logger = new Logger('Exchequer');
  const app = await NatsMicroservice(ExchequerModule, { queue: ENUM.NatsServicesQueue.EXCHEQUER });

  app.useGlobalInterceptors(new ErrorsLoggerInterceptor());

  app.listen();
  logger.log('Microservice is listening...');
}
bootstrap();
