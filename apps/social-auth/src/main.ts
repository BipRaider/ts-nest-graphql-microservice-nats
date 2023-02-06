import { Logger } from '@nestjs/common';

import { NatsMicroservice } from '@common/libs';
import { ErrorsLoggerInterceptor } from '@common/interceptor';
import { ENUM } from '@common/interface';

import { SocialAuthModule } from './social-auth.module';

async function bootstrap() {
  const logger = new Logger('Social');
  const app = await NatsMicroservice(SocialAuthModule, { queue: ENUM.NatsServicesQueue.SOCIAL_AUTH });

  app.useGlobalInterceptors(new ErrorsLoggerInterceptor());

  app.listen();
  logger.log('Microservice is listening...');
}

bootstrap();
