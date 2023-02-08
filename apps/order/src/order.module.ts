import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { NatsModule, NatsProvider, MongoCollection, MongoConnect } from '@common/libs';
import { ENUM } from '@common/interface';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderSchema } from './order.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    MongoConnect(ENUM.MongoCollectionNames.ORDER),
    MongoCollection(
      [
        {
          name: ENUM.MongoSchemaNames.ORDER,
          schema: OrderSchema,
        },
      ],
      ENUM.MongoCollectionNames.ORDER,
    ),

    NatsModule([
      {
        name: ENUM.NatsServicesName.API,
        queue: ENUM.NatsServicesQueue.API,
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    NatsProvider({
      provide: ENUM.NatsServicesName.ORDER,
      queue: ENUM.NatsServicesQueue.ORDER,
    }),
  ],
})
export class OrderModule {}
