import { NestFactory } from '@nestjs/core';
import { ExchequerModule } from './exchequer.module';

async function bootstrap() {
  const app = await NestFactory.create(ExchequerModule);
  await app.listen(3000);
}
bootstrap();
