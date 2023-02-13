import { Inject, Injectable } from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';

import { OrderContract } from '@common/contracts';
import { SendErrorUtil, ErrorUtil } from '@common/utils';
import { ENUM } from '@common/interface';

// import { IOrderExchangeService } from './types';
import { Entity } from '../order.entity';
import { OrderRepository } from '../order.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrderExchangeService {
  constructor(
    private readonly repository: OrderRepository,
    private readonly configService: ConfigService,
    @Inject(ENUM.NatsServicesName.API) private readonly apiClient: ClientNats,
    @Inject(ENUM.NatsServicesName.EXCHEQUER) private readonly exchequerClient: ClientNats,
    @Inject(ENUM.NatsServicesName.PRODUCT) private readonly productClient: ClientNats,
    @Inject(ENUM.NatsServicesName.EMAIL) private readonly emailClient: ClientNats,
  ) {}

  /*** step 1-2 to exchequer*/
  public readonly expectation = async (
    dto: OrderContract.ExchangeCommand.Request,
    item: Entity,
  ): Promise<SendErrorUtil | Entity> => {
    let expect: SendErrorUtil | Entity = null;

    const condition: boolean = [
      item.paid === ENUM.ORDER.PAID.ok,
      item.processed === ENUM.ORDER.PROCESS.complete,
      item.send === ENUM.ORDER.SEND.send,
      item.received === ENUM.ORDER.RECEIVE.complete,
      item.exchange === ENUM.ORDER.EXCHANGE.unused,
      !item.isCancel,
    ].every(v => v === true);

    if (condition) {
      expect = await this.repository.updateOrder({
        id: item.id,
        exchange: ENUM.ORDER.EXCHANGE.expectation,
        received: ENUM.ORDER.RECEIVE.exchange,
      });
    }

    return this.returnOrder(dto, item, expect);
  };

  /*** step 3 from exchequer*/
  public readonly check = async (
    dto: OrderContract.ExchangeCommand.Request,
    item: Entity,
  ): Promise<SendErrorUtil | Entity> => {
    let expect: SendErrorUtil | Entity = null;

    const condition: boolean = [
      item.paid === ENUM.ORDER.PAID.ok,
      item.processed === ENUM.ORDER.PROCESS.complete,
      item.send === ENUM.ORDER.SEND.send,
      item.received === ENUM.ORDER.RECEIVE.exchange,
      item.exchange === ENUM.ORDER.EXCHANGE.expectation,
      !item.isCancel,
    ].every(v => v === true);

    if (condition) {
      expect = await this.repository.updateOrder({
        id: item.id,
        exchange: ENUM.ORDER.EXCHANGE.check,
      });
    }

    return this.returnOrder(dto, item, expect);
  };

  /*** step 4 from exchequer*/
  public readonly ok = async (
    dto: OrderContract.ExchangeCommand.Request,
    item: Entity,
  ): Promise<SendErrorUtil | Entity> => {
    let expect: SendErrorUtil | Entity = null;

    const condition: boolean = [
      item.paid === ENUM.ORDER.PAID.ok,
      item.processed === ENUM.ORDER.PROCESS.complete,
      item.send === ENUM.ORDER.SEND.send,
      item.received === ENUM.ORDER.RECEIVE.exchange,
      item.exchange === ENUM.ORDER.EXCHANGE.check,
      !item.isCancel,
    ].every(v => v === true);

    if (condition) {
      expect = await this.repository.updateOrder({
        id: item.id,
        exchange: ENUM.ORDER.EXCHANGE.ok,
      });
    }

    return this.returnOrder(dto, item, expect);
  };

  /*** step 5 from exchequer*/
  public readonly refundable = async (
    dto: OrderContract.ExchangeCommand.Request,
    item: Entity,
  ): Promise<SendErrorUtil | Entity> => {
    let expect: SendErrorUtil | Entity = null;

    const condition: boolean = [
      item.paid === ENUM.ORDER.PAID.ok,
      item.processed === ENUM.ORDER.PROCESS.complete,
      item.send === ENUM.ORDER.SEND.send,
      item.received === ENUM.ORDER.RECEIVE.exchange,
      item.exchange === ENUM.ORDER.EXCHANGE.ok,
      !item.isCancel,
    ].every(v => v === true);

    if (condition) {
      expect = await this.repository.updateOrder({
        id: item.id,
        received: ENUM.ORDER.RECEIVE.exchange,
        send: ENUM.ORDER.SEND.expectation,
        processed: ENUM.ORDER.PROCESS.expectation,
        exchange: ENUM.ORDER.EXCHANGE.refundable,
      });
    }

    return this.returnOrder(dto, item, expect);
  };

  /*** step 6 from exchequer to user.*/
  public readonly noRefund = async (
    dto: OrderContract.ExchangeCommand.Request,
    item: Entity,
  ): Promise<SendErrorUtil | Entity> => {
    let expect: SendErrorUtil | Entity = null;

    const condition: boolean = [
      item.paid === ENUM.ORDER.PAID.ok,
      item.processed === ENUM.ORDER.PROCESS.complete,
      item.send === ENUM.ORDER.SEND.send,
      item.received === ENUM.ORDER.RECEIVE.exchange,
      item.exchange === ENUM.ORDER.EXCHANGE.ok,
      !item.isCancel,
    ].every(v => v === true);

    if (condition) {
      expect = await this.repository.updateOrder({
        id: item.id,
        exchange: ENUM.ORDER.EXCHANGE.no_refund,
      });
    }

    return this.returnOrder(dto, item, expect);
  };

  //------------------Private func-------------
  /*** `check` errors and return `err` or `entity` */
  private returnOrder = async (
    dto: OrderContract.ExchangeCommand.Request,
    item: Entity,
    expect: SendErrorUtil | Entity,
  ): Promise<SendErrorUtil | Entity> => {
    if (!expect) {
      return new ErrorUtil(403).send({
        error: 'Exchange cannot be changed.',
        payload: { exchange: item.exchange, codeOrder: item.codeOrder },
      });
    }

    if ('status' in expect) return expect;

    this.emitEvent(dto, expect);
    return expect;
  };

  /*** If all checks went well. Send event to nats.*/
  private emitEvent = (dto: OrderContract.ExchangeCommand.Request, item: Entity): Promise<void> => {
    this.exchequerClient.emit(
      `${ENUM.NatsServicesQueue.EXCHEQUER}.${ENUM.NatsServicesQueue.ORDER}.exchange.${item.exchange}`,
      {
        ...dto,
        processTime: Date.now(),
        item,
      },
    );

    if (item.processed === ENUM.ORDER.PROCESS.complete) {
      this.exchequerClient.emit(
        `${ENUM.NatsServicesQueue.PRODUCT}.${ENUM.NatsServicesQueue.ORDER}.get`,
        {
          ...dto,
          item,
        },
      );
    }

    return;
  };
}
