import { Inject, Injectable } from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';

import { OrderContract } from '@common/contracts';
import { SendErrorUtil, ErrorUtil } from '@common/utils';
import { ENUM } from '@common/interface';

// import { IOrderPaidService } from './types';
import { Entity } from './order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderPaidService {
  constructor(
    private readonly repository: OrderRepository,
    @Inject(ENUM.NatsServicesName.API) private readonly apiClient: ClientNats,
    @Inject(ENUM.NatsServicesName.EXCHEQUER) private readonly exchequerClient: ClientNats,
    @Inject(ENUM.NatsServicesName.PRODUCT) private readonly productClient: ClientNats,
    @Inject(ENUM.NatsServicesName.EMAIL) private readonly emailClient: ClientNats,
  ) {}

  /*** step 1 to exchequer*/
  public readonly expectation = async (
    dto: OrderContract.ReceiptPaidCommand.Request,
    item: Entity,
  ): Promise<SendErrorUtil | Entity> => {
    let expect: SendErrorUtil | Entity = null;

    if (item.paid === ENUM.ORDER.PAID.mistake || item.paid === ENUM.ORDER.PAID.expectation) {
      expect = await this.repository.updateOrder({
        id: item.id,
        paid: ENUM.ORDER.PAID.expectation,
      });
    }
    if (item.paid === ENUM.ORDER.PAID.expectation) {
      return this.returnOrder(dto, item, item);
    }

    return this.returnOrder(dto, item, expect);
  };
  /*** step 2 to exchequer*/
  public readonly paid = async (
    dto: OrderContract.ReceiptPaidCommand.Request,
    item: Entity,
  ): Promise<SendErrorUtil | Entity> => {
    let expect: SendErrorUtil | Entity = null;

    if (
      item.paid === ENUM.ORDER.PAID.expectation ||
      item.paid === ENUM.ORDER.PAID.incomplete ||
      item.paid === ENUM.ORDER.PAID.paid
    ) {
      expect = await this.repository.updateOrder({
        id: item.id,
        paid: ENUM.ORDER.PAID.paid,
      });
    }

    return this.returnOrder(dto, item, expect);
  };

  /*** step 3 from exchequer*/
  public readonly check = async (
    dto: OrderContract.ReceiptPaidCommand.Request,
    item: Entity,
  ): Promise<SendErrorUtil | Entity> => {
    let expect: SendErrorUtil | Entity = null;
    if (item.paid === ENUM.ORDER.PAID.paid || item.paid === ENUM.ORDER.PAID.mistake) {
      expect = await this.repository.updateOrder({
        id: item.id,
        paid: ENUM.ORDER.PAID.check,
      });
    }

    return this.returnOrder(dto, item, expect);
  };

  /*** step 4 from exchequer*/
  public readonly ok = async (
    dto: OrderContract.ReceiptPaidCommand.Request,
    item: Entity,
  ): Promise<SendErrorUtil | Entity> => {
    let expect: SendErrorUtil | Entity = null;

    if (item.paid === ENUM.ORDER.PAID.check) {
      expect = await this.repository.updateOrder({
        id: item.id,
        paid: ENUM.ORDER.PAID.ok,
      });
    }

    return this.returnOrder(dto, item, expect);
  };

  /*** step 5 from exchequer*/
  public readonly incomplete = async (
    dto: OrderContract.ReceiptPaidCommand.Request,
    item: Entity,
  ): Promise<SendErrorUtil | Entity> => {
    let expect: SendErrorUtil | Entity = null;

    if (item.paid === ENUM.ORDER.PAID.check) {
      expect = await this.repository.updateOrder({
        id: item.id,
        paid: ENUM.ORDER.PAID.incomplete,
      });
    }

    return this.returnOrder(dto, item, expect);
  };

  /*** step 6 from exchequer*/
  public readonly mistake = async (
    dto: OrderContract.ReceiptPaidCommand.Request,
    item: Entity,
  ): Promise<SendErrorUtil | Entity> => {
    let expect: SendErrorUtil | Entity = null;

    if (item.paid === ENUM.ORDER.PAID.check) {
      expect = await this.repository.updateOrder({
        id: item.id,
        paid: ENUM.ORDER.PAID.mistake,
      });
    }

    return this.returnOrder(dto, item, expect);
  };

  /*** step 7 from exchequer to user.*/
  public readonly refund = async (
    dto: OrderContract.ReceiptPaidCommand.Request,
    item: Entity,
  ): Promise<SendErrorUtil | Entity> => {
    let expect: SendErrorUtil | Entity = null;

    if (
      item.paid === ENUM.ORDER.PAID.ok ||
      item.paid === ENUM.ORDER.PAID.incomplete ||
      item.paid === ENUM.ORDER.PAID.mistake ||
      item.paid === ENUM.ORDER.PAID.check
    ) {
      expect = await this.repository.updateOrder({
        id: item.id,
        paid: ENUM.ORDER.PAID.refund,
        isCancel: true,
      });
    }

    if (item.isCancel && !item.isState) {
      expect = await this.repository.updateOrder({
        id: item.id,
        paid: ENUM.ORDER.PAID.refund,
      });
    }

    return this.returnOrder(dto, item, expect);
  };

  /*** step 8 to exchequer.*/
  public readonly noRefund = async (
    dto: OrderContract.ReceiptPaidCommand.Request,
    item: Entity,
  ): Promise<SendErrorUtil | Entity> => {
    let expect: SendErrorUtil | Entity = null;
    const now = Date.now();
    const created = new Date(item.created).getTime();
    const time = now - created;

    if (0 > time) {
      expect = await this.repository.updateOrder({
        id: item.id,
        paid: ENUM.ORDER.PAID.no_refund,
        isState: true,
      });
    }

    if (item.isState && !item.isCancel) {
      expect = await this.repository.updateOrder({
        id: item.id,
        paid: ENUM.ORDER.PAID.no_refund,
      });
    }

    return this.returnOrder(dto, item, expect);
  };

  //------------------Private func-------------
  /*** `check` errors and return `err` or `entity` */
  private returnOrder = async (
    dto: OrderContract.ReceiptPaidCommand.Request,
    item: Entity,
    expect: SendErrorUtil | Entity,
  ): Promise<SendErrorUtil | Entity> => {
    if (!expect) {
      return new ErrorUtil(403).send({
        error: 'Payment cannot be changed.',
        payload: { paid: item.paid, codeOrder: item.codeOrder },
      });
    }

    if ('status' in expect) return expect;

    this.emitPaidEvent(dto, expect);
    return expect;
  };

  /*** If all checks went well. Send event to nats.*/
  private emitPaidEvent = (
    dto: OrderContract.ReceiptPaidCommand.Request,
    item: Entity,
  ): Promise<void> => {
    const exchequer = ENUM.NatsServicesQueue.EXCHEQUER;

    this.exchequerClient.emit(`${exchequer}.paid.${item.paid}`, {
      ...dto,
      item,
    });

    return;
  };
}
