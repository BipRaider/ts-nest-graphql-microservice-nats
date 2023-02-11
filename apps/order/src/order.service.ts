import { Inject, Injectable } from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';

import { OrderContract } from '@common/contracts';
import { SendErrorUtil, ErrorUtil } from '@common/utils';
import { ENUM } from '@common/interface';

import { IOrderService } from './types';
import { Entity } from './order.entity';
import { OrderRepository } from './order.repository';
import { OrderPaidService } from './order.paid.service';
import { ISchema } from './order.schema';

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    private readonly repository: OrderRepository,
    private readonly paidService: OrderPaidService,
    @Inject(ENUM.NatsServicesName.API) private readonly apiClient: ClientNats,
    @Inject(ENUM.NatsServicesName.EXCHEQUER) private readonly exchequerClient: ClientNats,
    @Inject(ENUM.NatsServicesName.PRODUCT) private readonly productClient: ClientNats,
    @Inject(ENUM.NatsServicesName.EMAIL) private readonly emailClient: ClientNats,
  ) {}

  public create = async (
    dto: OrderContract.CreateCommand.Request,
  ): Promise<SendErrorUtil | Entity> => {
    try {
      const entity = new Entity(dto);
      if (!entity.customer && !entity.products?.length) {
        return new ErrorUtil(400).send({
          error: 'Some properties not found.',
          payload: { customer: entity.customer, products: entity.products },
        });
      }

      const item = await this.repository.create(entity);
      return new Entity(item);
    } catch (error) {
      return new ErrorUtil(502).send({
        error: 'OrderService.create something wrong.',
        payload: error,
      });
    }
  };

  public find = async (dto: OrderContract.FindQuery.Request): Promise<SendErrorUtil | Entity> => {
    try {
      const entity = new Entity(dto);
      const item = await this.repository.find(entity);
      if (!item) {
        return new ErrorUtil(404).send({
          error: 'Order not found.',
          payload: { id: entity.id, codeOrder: entity.codeOrder },
        });
      }

      return new Entity(item);
    } catch (error) {
      return new ErrorUtil(502).send({
        error: 'OrderService.find something wrong.',
        payload: error,
      });
    }
  };

  public get = async (dto: OrderContract.GetQuery.Request): Promise<SendErrorUtil | Entity[]> => {
    try {
      const entity = new Entity(dto).paginate(dto);
      const items = await this.repository.get(entity);
      return items.map(item => new Entity(item));
    } catch (error) {
      return new ErrorUtil(502).send({
        error: 'OrderService.find something wrong.',
        payload: error,
      });
    }
  };

  public all = async (dto: OrderContract.AllQuery.Request): Promise<SendErrorUtil | Entity[]> => {
    try {
      const entity = new Entity(dto).paginate(dto);
      const items = await this.repository.all(entity);
      return items.map(item => new Entity(item));
    } catch (error) {
      return new ErrorUtil(502).send({
        error: 'OrderService.all something wrong.',
        payload: error,
      });
    }
  };

  // modify order
  public paid = async (
    dto: OrderContract.ReceiptPaidCommand.Request,
  ): Promise<SendErrorUtil | Entity> => {
    try {
      let item: SendErrorUtil | Entity;
      const expect: SendErrorUtil | Entity = await this.repository.findOrder(dto);
      if ('status' in expect) return expect;

      if (dto.paid === ENUM.ORDER.PAID.expectation) {
        item = await this.paidService.expectation(dto, expect);
      }
      if (dto.paid === ENUM.ORDER.PAID.paid) {
        item = await this.paidService.paid(dto, expect);
      }
      if (dto.paid === ENUM.ORDER.PAID.check) {
        item = await this.paidService.check(dto, expect);
      }
      if (dto.paid === ENUM.ORDER.PAID.ok) {
        item = await this.paidService.ok(dto, expect);
      }
      if (dto.paid === ENUM.ORDER.PAID.incomplete) {
        item = await this.paidService.incomplete(dto, expect);
      }
      if (dto.paid === ENUM.ORDER.PAID.refund) {
        item = await this.paidService.refund(dto, expect);
      }
      if (dto.paid === ENUM.ORDER.PAID.no_refund) {
        item = await this.paidService.noRefund(dto, expect);
      }

      if ('status' in item) return item;
      return new Entity(item);
    } catch (error) {
      return new ErrorUtil(502).send({
        error: 'OrderService.paid something wrong.',
        payload: error,
      });
    }
  };

  public processed = async (
    dto: OrderContract.ProcessedCommand.Request,
  ): Promise<SendErrorUtil | Entity> => {
    try {
      const item = await this.repository.findOrder(dto);
      if ('status' in item) return item;

      if (item.processed === ENUM.ORDER.PROCESS.unused) console.log(ENUM.ORDER.PROCESS.unused);
      if (item.processed === ENUM.ORDER.PROCESS.expectation)
        console.log(ENUM.ORDER.PROCESS.expectation);
      if (item.processed === ENUM.ORDER.PROCESS.check) console.log(ENUM.ORDER.PROCESS.check);
      if (item.processed === ENUM.ORDER.PROCESS.complete) console.log(ENUM.ORDER.PROCESS.complete);
      if (item.processed === ENUM.ORDER.PROCESS.incomplete)
        console.log(ENUM.ORDER.PROCESS.incomplete);
      if (item.processed === ENUM.ORDER.PROCESS.cancel) console.log(ENUM.ORDER.PROCESS.cancel);
      if (item.processed === ENUM.ORDER.PROCESS.mistake) console.log(ENUM.ORDER.PROCESS.mistake);

      this.exchequerClient.emit(`${ENUM.NatsServicesQueue.EXCHEQUER}.processed`, {
        ...dto,
        orderId: item.id,
      });

      return new Entity(item);
    } catch (error) {
      return new ErrorUtil(502).send({
        error: 'OrderService.processed something wrong.',
        payload: error,
      });
    }
  };

  public send = async (dto: OrderContract.SendCommand.Request): Promise<SendErrorUtil | Entity> => {
    try {
      const item = await this.repository.findOrder(dto);
      if ('status' in item) return item;

      if (item.send === ENUM.ORDER.SEND.unused) console.log(ENUM.ORDER.SEND.unused);
      if (item.send === ENUM.ORDER.SEND.expectation) console.log(ENUM.ORDER.SEND.expectation);
      if (item.send === ENUM.ORDER.SEND.check) console.log(ENUM.ORDER.SEND.check);
      if (item.send === ENUM.ORDER.SEND.send) console.log(ENUM.ORDER.SEND.send);
      if (item.send === ENUM.ORDER.SEND.stop) console.log(ENUM.ORDER.SEND.stop);
      if (item.send === ENUM.ORDER.SEND.cancel) console.log(ENUM.ORDER.SEND.cancel);

      this.exchequerClient.emit(`${ENUM.NatsServicesQueue.EXCHEQUER}.send`, {
        ...dto,
        orderId: item.id,
      });

      return new Entity(item);
    } catch (error) {
      return new ErrorUtil(502).send({
        error: 'OrderService.send something wrong.',
        payload: error,
      });
    }
  };

  public receive = async (
    dto: OrderContract.ReceivedCommand.Request,
  ): Promise<SendErrorUtil | Entity> => {
    try {
      const item = await this.repository.findOrder(dto);
      if ('status' in item) return item;

      if (item.received === ENUM.ORDER.RECEIVE.unused) console.log(ENUM.ORDER.RECEIVE.unused);
      if (item.received === ENUM.ORDER.RECEIVE.expectation)
        console.log(ENUM.ORDER.RECEIVE.expectation);
      if (item.received === ENUM.ORDER.RECEIVE.check) console.log(ENUM.ORDER.RECEIVE.check);
      if (item.received === ENUM.ORDER.RECEIVE.complete) console.log(ENUM.ORDER.RECEIVE.complete);
      if (item.received === ENUM.ORDER.RECEIVE.exchange) console.log(ENUM.ORDER.RECEIVE.exchange);
      if (item.received === ENUM.ORDER.RECEIVE.fake) console.log(ENUM.ORDER.RECEIVE.fake);

      this.exchequerClient.emit(`${ENUM.NatsServicesQueue.EXCHEQUER}.receive`, {
        ...dto,
        orderId: item.id,
      });

      return new Entity(item);
    } catch (error) {
      return new ErrorUtil(502).send({
        error: 'OrderService.receive something wrong.',
        payload: error,
      });
    }
  };

  public exchange = async (
    dto: OrderContract.ExchangeCommand.Request,
  ): Promise<SendErrorUtil | Entity> => {
    try {
      const item = await this.repository.findOrder(dto);
      if ('status' in item) return item;

      if (item.exchange === ENUM.ORDER.EXCHANGE.unused) console.log(ENUM.ORDER.EXCHANGE.unused);
      if (item.exchange === ENUM.ORDER.EXCHANGE.expectation)
        console.log(ENUM.ORDER.EXCHANGE.expectation);
      if (item.exchange === ENUM.ORDER.EXCHANGE.check) console.log(ENUM.ORDER.EXCHANGE.check);
      if (item.exchange === ENUM.ORDER.EXCHANGE.ok) console.log(ENUM.ORDER.EXCHANGE.ok);
      if (item.exchange === ENUM.ORDER.EXCHANGE.refundable)
        console.log(ENUM.ORDER.EXCHANGE.refundable);

      if (item.exchange === ENUM.ORDER.EXCHANGE.no_refund)
        console.log(ENUM.ORDER.EXCHANGE.no_refund);

      this.exchequerClient.emit(`${ENUM.NatsServicesQueue.EXCHEQUER}.exchange`, {
        ...dto,
        orderId: item.id,
      });

      return item;
    } catch (error) {
      return new ErrorUtil(502).send({
        error: 'OrderService.exchange something wrong.',
        payload: error,
      });
    }
  };
}
