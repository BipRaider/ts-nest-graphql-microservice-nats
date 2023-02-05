import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { NatsModule, NatsProvider } from '@common/libs';
import { ENUM } from '@common/interface';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NatsModule([
      {
        name: ENUM.NatsServicesName.API,
        queue: ENUM.NatsServicesQueue.API,
      },
      {
        name: ENUM.NatsServicesName.ORDER,
        queue: ENUM.NatsServicesQueue.ORDER,
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    NatsProvider({
      provide: ENUM.NatsServicesName.PRODUCT,
      queue: ENUM.NatsServicesQueue.PRODUCT,
    }),
  ],
})
export class ProductsModule {}
