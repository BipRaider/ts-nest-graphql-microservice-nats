import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { NatsModule, NatsProvider } from '@common/libs';
import { ENUM } from '@common/interface';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
