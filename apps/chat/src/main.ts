import { Logger } from '@nestjs/common';

import { NatsMicroservice } from '@common/libs';
import { ErrorsLoggerInterceptor } from '@common/interceptor';
import { ENUM } from '@common/interface';

import { ChatModule } from './chat.module';

async function bootstrap() {
  const logger = new Logger('Chat');
  const app = await NatsMicroservice(ChatModule, { queue: ENUM.NatsServicesQueue.CHAT });

  app.useGlobalInterceptors(new ErrorsLoggerInterceptor());

  app.listen();
  logger.log('Microservice is listening...');
}
bootstrap();
