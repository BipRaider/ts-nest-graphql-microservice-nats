import { Module } from '@nestjs/common';

import { NatsModule } from '@common/libs';
import { ENUM } from '@common/interface';

import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';

@Module({
  imports: [
    NatsModule([
      {
        name: ENUM.NatsServicesName.PRODUCT,
        queue: ENUM.NatsServicesQueue.PRODUCT,
      },
    ]),
  ],
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}
