import { NestFactory } from '@nestjs/core';
import { SocialAuthModule } from './social-auth.module';

async function bootstrap() {
  const app = await NestFactory.create(SocialAuthModule);
  await app.listen(3000);
}
bootstrap();
