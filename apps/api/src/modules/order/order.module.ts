import { Module } from '@nestjs/common';

import { NatsModule } from '@common/libs';
import { ENUM } from '@common/interface';

import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';

@Module({
  imports: [
    NatsModule([
      {
        name: ENUM.NatsServicesName.ORDER,
        queue: ENUM.NatsServicesQueue.ORDER,
      },
    ]),
  ],
  providers: [OrderService, OrderResolver],
})
export class OrderModule {}
