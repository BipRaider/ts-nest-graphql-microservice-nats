import { Module } from '@nestjs/common';
import { NatsModule } from '@common/libs';

import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';

@Module({
  imports: [
    NatsModule([
      {
        name: 'PRODUCT_SERVICE',
        queue: 'product',
      },
    ]),
  ],
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}
