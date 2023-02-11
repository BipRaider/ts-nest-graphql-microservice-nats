import { Inject, Injectable } from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';

import { OrderContract } from '@common/contracts';
import { SendErrorUtil, ErrorUtil } from '@common/utils';
import { ENUM } from '@common/interface';

// import { IOrderProcessService } from './types';
import { Entity } from './order.entity';
import { OrderRepository } from './order.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrderProcessService {
  constructor(
    private readonly repository: OrderRepository,
    private readonly configService: ConfigService,
    @Inject(ENUM.NatsServicesName.API) private readonly apiClient: ClientNats,
    @Inject(ENUM.NatsServicesName.EXCHEQUER) private readonly exchequerClient: ClientNats,
    @Inject(ENUM.NatsServicesName.PRODUCT) private readonly productClient: ClientNats,
    @Inject(ENUM.NatsServicesName.EMAIL) private readonly emailClient: ClientNats,
  ) {}

  /*** step 2 to exchequer*/
  public readonly expectation = async (
    dto: OrderContract.ProcessedCommand.Request,
    item: Entity,
  ): Promise<SendErrorUtil | Entity> => {
    let expect: SendErrorUtil | Entity = null;

    const unused: boolean = [
      item.paid === ENUM.ORDER.PAID.ok,
      item.processed === ENUM.ORDER.PROCESS.unused,
      !item.isCancel,
    ].every(v => v === true);

    // When order paid.
    if (unused) {
      expect = await this.repository.updateOrder({
        id: item.id,
        processed: ENUM.ORDER.PROCESS.expectation,
      });
    }

    const exchange: boolean = [
      item.paid === ENUM.ORDER.PAID.ok,
      item.processed === ENUM.ORDER.PROCESS.complete,
      item.send === ENUM.ORDER.SEND.send,
      item.received === ENUM.ORDER.RECEIVE.exchange,
      !item.isCancel,
    ].every(v => v === true);

    // When exchange.
    if (exchange) {
      expect = await this.repository.updateOrder({
        id: item.id,
        processed: ENUM.ORDER.PROCESS.expectation,
        send: ENUM.ORDER.SEND.expectation,
        received: ENUM.ORDER.RECEIVE.expectation,
      });
    }

    return this.returnOrder(dto, item, expect);
  };

  /*** step 3 from exchequer*/
  public readonly check = async (
    dto: OrderContract.ProcessedCommand.Request,
    item: Entity,
  ): Promise<SendErrorUtil | Entity> => {
    let expect: SendErrorUtil | Entity = null;

    const expectation: boolean = [
      item.paid === ENUM.ORDER.PAID.ok,
      item.processed === ENUM.ORDER.PROCESS.expectation,
      !item.isCancel,
    ].every(v => v === true);

    if (expectation) {
      expect = await this.repository.updateOrder({
        id: item.id,
        processed: ENUM.ORDER.PROCESS.check,
      });
    }

    return this.returnOrder(dto, item, expect);
  };

  /*** step 4 from exchequer*/
  public readonly complete = async (
    dto: OrderContract.ProcessedCommand.Request,
    item: Entity,
  ): Promise<SendErrorUtil | Entity> => {
    let expect: SendErrorUtil | Entity = null;

    const check: boolean = [
      item.paid === ENUM.ORDER.PAID.ok,
      item.processed === ENUM.ORDER.PROCESS.check,
      !item.isCancel,
    ].every(v => v === true);

    if (check) {
      expect = await this.repository.updateOrder({
        id: item.id,
        processed: ENUM.ORDER.PROCESS.complete,
        send: ENUM.ORDER.SEND.expectation,
      });
    }

    return this.returnOrder(dto, item, expect);
  };

  /*** step 5 from exchequer*/
  public readonly incomplete = async (
    dto: OrderContract.ProcessedCommand.Request,
    item: Entity,
  ): Promise<SendErrorUtil | Entity> => {
    let expect: SendErrorUtil | Entity = null;

    const check: boolean = [
      item.paid === ENUM.ORDER.PAID.ok,
      item.processed === ENUM.ORDER.PROCESS.check,
      !item.isCancel,
    ].every(v => v === true);

    if (check) {
      expect = await this.repository.updateOrder({
        id: item.id,
        processed: ENUM.ORDER.PROCESS.incomplete,
      });
    }

    return this.returnOrder(dto, item, expect);
  };

  /*** step 6 from exchequer to user.*/
  public readonly cancel = async (
    dto: OrderContract.ProcessedCommand.Request,
    item: Entity,
  ): Promise<SendErrorUtil | Entity> => {
    let expect: SendErrorUtil | Entity = null;

    if (item.paid === ENUM.ORDER.PAID.ok && item.isCancel) {
      expect = await this.repository.updateOrder({
        id: item.id,
        processed: ENUM.ORDER.PROCESS.cancel,
        paid: ENUM.ORDER.PAID.refund, //TODO:
      });
    }

    return this.returnOrder(dto, item, expect);
  };

  /*** step 7 from exchequer*/
  public readonly mistake = async (
    dto: OrderContract.ProcessedCommand.Request,
    item: Entity,
  ): Promise<SendErrorUtil | Entity> => {
    let expect: SendErrorUtil | Entity = null;

    const check: boolean = [
      item.paid === ENUM.ORDER.PAID.ok,
      item.processed === ENUM.ORDER.PROCESS.check,
      !item.isCancel,
    ].every(v => v === true);

    if (check) {
      expect = await this.repository.updateOrder({
        id: item.id,
        processed: ENUM.ORDER.PROCESS.mistake,
      });
    }

    return this.returnOrder(dto, item, expect);
  };

  //------------------Private func-------------
  /*** `check` errors and return `err` or `entity` */
  private returnOrder = async (
    dto: OrderContract.ProcessedCommand.Request,
    item: Entity,
    expect: SendErrorUtil | Entity,
  ): Promise<SendErrorUtil | Entity> => {
    if (!expect) {
      return new ErrorUtil(403).send({
        error: 'Process cannot be changed.',
        payload: { paid: item.paid, codeOrder: item.codeOrder },
      });
    }

    if ('status' in expect) return expect;

    this.emitPaidEvent(dto, expect);
    return expect;
  };

  /*** If all checks went well. Send event to nats.*/
  private emitPaidEvent = (
    dto: OrderContract.ProcessedCommand.Request,
    item: Entity,
  ): Promise<void> => {
    this.exchequerClient.emit(`${ENUM.NatsServicesQueue.EXCHEQUER}.order.process.${item.paid}`, {
      ...dto,
      processTime: Date.now(),
      item,
    });

    if (item.processed === ENUM.ORDER.PROCESS.complete) {
      this.exchequerClient.emit(`${ENUM.NatsServicesQueue.PRODUCT}.order.get`, {
        ...dto,
        item,
      });
    }

    return;
  };
}
