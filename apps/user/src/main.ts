import { Logger } from '@nestjs/common';
import { UserModule } from './user.module';
import { NatsMicroservice } from '@common/libs';
import { ErrorsLoggerInterceptor } from '@common/interceptor';

async function bootstrap() {
  const logger = new Logger('User');
  const app = await NatsMicroservice(UserModule, { queue: 'user' });
  app.useGlobalInterceptors(new ErrorsLoggerInterceptor());
  app.listen();
  logger.log('Microservice is listening...');
}
bootstrap();
