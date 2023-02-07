import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { NatsModule, NatsProvider, MongoCollection, MongoConnect } from '@common/libs';
import { ENUM } from '@common/interface';

import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { ProductSchema } from './product.schema';
import { ProductRepository } from './product.repository';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    MongoConnect(ENUM.MongoCollectionNames.PRODUCT),
    MongoCollection(
      [
        {
          name: ENUM.MongoSchemaNames.PRODUCT,
          schema: ProductSchema,
        },
      ],
      ENUM.MongoCollectionNames.PRODUCT,
    ),

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
  controllers: [ProductController],
  providers: [
    ProductRepository,
    ProductService,
    NatsProvider({
      provide: ENUM.NatsServicesName.PRODUCT,
      queue: ENUM.NatsServicesQueue.PRODUCT,
    }),
  ],
})
export class ProductsModule {}
