import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { ProductsModule } from './products.module';

async function bootstrap() {
  const logger = new Logger('Product');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ProductsModule, {
    transport: Transport.NATS,
    options: {
      servers: ['nats://nats:4222'],
    },
  });
  app.listen();
  logger.log('Product microservice is listening...');
}

bootstrap();
