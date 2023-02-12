import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { OrderContract } from '@common/contracts';
import { SendErrorUtil } from '@common/utils';

import { IOrderController } from './types';
import { OrderService } from './order.service';
import { Entity } from './order.entity';

@Controller()
export class OrderController implements IOrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern(OrderContract.CreateCommand.Pattern)
  public async create(
    @Payload() payload: OrderContract.CreateCommand.Request,
  ): Promise<SendErrorUtil | OrderContract.CreateCommand.Response> {
    const item: Entity | SendErrorUtil = await this.orderService.create(payload);

    if ('status' in item) return item;

    return {
      created: item.created,
      updated: item.updated,
      id: item.id,
      codeOrder: item.codeOrder,
      price: item.price,
      paid: item.paid,
    };
  }

  @MessagePattern(OrderContract.FindQuery.Pattern)
  public async find(
    @Payload() payload: OrderContract.FindQuery.Request,
  ): Promise<SendErrorUtil | OrderContract.FindQuery.Response> {
    const item: Entity | SendErrorUtil = await this.orderService.find(payload);

    if ('status' in item) return item;

    return item;
  }

  @MessagePattern(OrderContract.GetQuery.Pattern)
  public async get(
    @Payload() payload: OrderContract.GetQuery.Request,
  ): Promise<SendErrorUtil | OrderContract.GetQuery.Response[]> {
    const item: Entity[] | SendErrorUtil = await this.orderService.get(payload);

    if ('status' in item) return item;

    return item;
  }

  @MessagePattern(OrderContract.AllQuery.Pattern)
  public async all(
    @Payload() payload: OrderContract.AllQuery.Request,
  ): Promise<SendErrorUtil | OrderContract.AllQuery.Response[]> {
    const item: Entity[] | SendErrorUtil = await this.orderService.all(payload);

    if ('status' in item) return item;

    return item;
  }

  @MessagePattern(OrderContract.UpdateCommand.Pattern)
  public async update(
    @Payload() payload: OrderContract.UpdateCommand.Request,
  ): Promise<SendErrorUtil | OrderContract.UpdateCommand.Response> {
    const item: Entity | SendErrorUtil = await this.orderService.update(payload);

    if ('status' in item) return item;

    return item;
  }

  @MessagePattern(OrderContract.ReceiptPaidCommand.Pattern)
  public async paidUpdate(
    @Payload() payload: OrderContract.ReceiptPaidCommand.Request,
  ): Promise<SendErrorUtil | OrderContract.ReceiptPaidCommand.Response> {
    const item: Entity | SendErrorUtil = await this.orderService.paid(payload);

    if ('status' in item) return item;

    return item;
  }
}
