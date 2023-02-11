import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { NatsModule, NatsProvider, MongoCollection, MongoConnect } from '@common/libs';
import { ENUM } from '@common/interface';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { OrderSchema } from './order.schema';
import { OrderPaymentService } from './order.paid.service';

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
      {
        name: ENUM.NatsServicesName.PRODUCT,
        queue: ENUM.NatsServicesQueue.PRODUCT,
      },
      {
        name: ENUM.NatsServicesName.EXCHEQUER,
        queue: ENUM.NatsServicesQueue.EXCHEQUER,
      },
      {
        name: ENUM.NatsServicesName.EMAIL,
        queue: ENUM.NatsServicesQueue.EMAIL,
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepository,
    OrderPaymentService,
    NatsProvider({
      provide: ENUM.NatsServicesName.ORDER,
      queue: ENUM.NatsServicesQueue.ORDER,
    }),
  ],
})
export class OrderModule {}
