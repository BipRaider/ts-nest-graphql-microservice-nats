import { Inject, Injectable } from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';

import { OrderContract } from '@common/contracts';
import { SendErrorUtil, ErrorUtil } from '@common/utils';
import { ENUM } from '@common/interface';

// import { IOrderPaidService } from './types';
import { Entity } from '../order.entity';
import { OrderRepository } from '../order.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrderPaymentService {
  constructor(
    private readonly repository: OrderRepository,
    private readonly configService: ConfigService,
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

    if (item.paid === ENUM.ORDER.PAID.mistake) {
      expect = await this.repository.updateOrder({
        id: item.id,
        paid: ENUM.ORDER.PAID.expectation,
      });
    }

    return this.returnOrder(dto, item, expect);
  };
  /*** step 2 to exchequer*/
  public readonly paid = async (
    dto: OrderContract.ReceiptPaidCommand.Request,
    item: Entity,
  ): Promise<SendErrorUtil | Entity> => {
    let expect: SendErrorUtil | Entity = null;

    const found: boolean = [
      ENUM.ORDER.PAID.expectation,
      ENUM.ORDER.PAID.incomplete,
      ENUM.ORDER.PAID.paid,
    ].some(v => item.paid.includes(v));

    if (found) {
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
        processed: ENUM.ORDER.PROCESS.expectation,
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

    const foundPid: boolean = [
      ENUM.ORDER.PAID.ok,
      ENUM.ORDER.PAID.incomplete,
      ENUM.ORDER.PAID.mistake,
      ENUM.ORDER.PAID.check,
    ].some(v => item.paid.includes(v));

    if (foundPid || item.processed === ENUM.ORDER.PROCESS.mistake) {
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

    if (item.received === ENUM.ORDER.RECEIVE.complete) {
      const now: number = Date.now();
      const created: number = new Date(item.created).getTime();
      const timeNoRefund: number | string =
        this.configService.get('TIME_NO_REFUND') || 14 * 24 * 60 * 60;
      const time: number = now - created;

      if (time > Number(timeNoRefund)) {
        expect = await this.repository.updateOrder({
          id: item.id,
          paid: ENUM.ORDER.PAID.no_refund,
          isState: true,
        });
      }
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

    this.emitEvent(dto, expect);
    return expect;
  };

  /*** If all checks went well. Send event to nats.*/
  private emitEvent = (
    dto: OrderContract.ReceiptPaidCommand.Request,
    item: Entity,
  ): Promise<void> => {
    this.exchequerClient.emit(
      `${ENUM.NatsServicesQueue.EXCHEQUER}.${ENUM.NatsServicesQueue.ORDER}.payment.${item.paid}`,
      {
        ...dto,
        item,
      },
    );

    if (item.paid === ENUM.ORDER.PAID.ok) {
      this.exchequerClient.emit(
        `${ENUM.NatsServicesQueue.PRODUCT}.${ENUM.NatsServicesQueue.ORDER}.reserve`,
        {
          ...dto,
          item,
        },
      );
    }

    return;
  };
}
