import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { NatsModule, NatsProvider } from '@common/options';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NatsModule([
      {
        name: 'API_SERVICE',
        queue: 'api',
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, NatsProvider({ provide: 'PRODUCT_SERVICE', queue: 'product' })],
})
export class ProductsModule {}
