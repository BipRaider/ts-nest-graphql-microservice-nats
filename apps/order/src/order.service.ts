import { Inject, Injectable } from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';

import { OrderContract } from '@common/contracts';
import { SendErrorUtil, ErrorUtil } from '@common/utils';
import { ENUM } from '@common/interface';

import { IOrderService } from './types';
import { ISchema } from './order.schema';
import { Entity } from './order.entity';
import { OrderRepository } from './order.repository';
import { OrderPaymentService } from './order.paid.service';
import { OrderProcessService } from './order.process.service';
import { OrderSendService } from './order.send.service';

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    private readonly repository: OrderRepository,
    private readonly paymentService: OrderPaymentService,
    private readonly processService: OrderProcessService,
    private readonly sendService: OrderSendService,
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
      let item: SendErrorUtil | Entity = null;
      const expect: SendErrorUtil | Entity = await this.repository.findOrder(dto);
      if ('status' in expect) return expect;

      if (dto.paid === ENUM.ORDER.PAID.expectation) {
        item = await this.paymentService.expectation(dto, expect);
      }
      if (dto.paid === ENUM.ORDER.PAID.paid) {
        item = await this.paymentService.paid(dto, expect);
      }
      if (dto.paid === ENUM.ORDER.PAID.check) {
        item = await this.paymentService.check(dto, expect);
      }
      if (dto.paid === ENUM.ORDER.PAID.ok) {
        item = await this.paymentService.ok(dto, expect);
      }
      if (dto.paid === ENUM.ORDER.PAID.incomplete) {
        item = await this.paymentService.incomplete(dto, expect);
      }
      if (dto.paid === ENUM.ORDER.PAID.refund) {
        item = await this.paymentService.refund(dto, expect);
      }
      if (dto.paid === ENUM.ORDER.PAID.no_refund) {
        item = await this.paymentService.noRefund(dto, expect);
      }
      if (item === null) {
        item = new ErrorUtil(404).send({
          error: 'Payment cannot be changed.',
          payload: { paid: dto.paid, codeOrder: dto.codeOrder },
        });
      }

      if ('status' in item) return item;

      return item;
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
      let item: SendErrorUtil | Entity;
      const expect: SendErrorUtil | Entity = await this.repository.findOrder(dto);
      if ('status' in expect) return expect;

      if (dto.processed === ENUM.ORDER.PROCESS.expectation) {
        this.processService.expectation(dto, expect);
      }
      if (dto.processed === ENUM.ORDER.PROCESS.check) {
        this.processService.check(dto, expect);
      }
      if (dto.processed === ENUM.ORDER.PROCESS.complete) {
        this.processService.complete(dto, expect);
      }
      if (dto.processed === ENUM.ORDER.PROCESS.incomplete) {
        this.processService.incomplete(dto, expect);
      }
      if (dto.processed === ENUM.ORDER.PROCESS.cancel) {
        this.processService.cancel(dto, expect);
      }
      if (dto.processed === ENUM.ORDER.PROCESS.mistake) {
        this.processService.mistake(dto, expect);
      }
      if (item === null) {
        item = new ErrorUtil(404).send({
          error: 'Process cannot be changed.',
          payload: { processed: dto.processed, codeOrder: dto.codeOrder },
        });
      }

      if ('status' in item) return item;

      return item;
    } catch (error) {
      return new ErrorUtil(502).send({
        error: 'OrderService.processed something wrong.',
        payload: error,
      });
    }
  };

  public send = async (dto: OrderContract.SendCommand.Request): Promise<SendErrorUtil | Entity> => {
    try {
      let item: SendErrorUtil | Entity;
      const expect: SendErrorUtil | Entity = await this.repository.findOrder(dto);
      if ('status' in expect) return expect;

      if (dto.send === ENUM.ORDER.SEND.expectation) {
        this.sendService.expectation(dto, expect);
      }
      if (dto.send === ENUM.ORDER.SEND.check) {
        this.sendService.check(dto, expect);
      }
      if (dto.send === ENUM.ORDER.SEND.send) {
        this.sendService.send(dto, expect);
      }
      if (dto.send === ENUM.ORDER.SEND.stop) {
        this.sendService.stop(dto, expect);
      }
      if (dto.send === ENUM.ORDER.SEND.cancel) {
        this.sendService.cancel(dto, expect);
      }
      if (item === null) {
        item = new ErrorUtil(404).send({
          error: 'Send cannot be changed.',
          payload: { send: dto.send, codeOrder: dto.codeOrder },
        });
      }

      if ('status' in item) return item;

      return item;
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
      let item: SendErrorUtil | Entity;
      const expect: SendErrorUtil | Entity = await this.repository.findOrder(dto);
      if ('status' in expect) return expect;

      if (dto.received === ENUM.ORDER.RECEIVE.expectation)
        console.log(ENUM.ORDER.RECEIVE.expectation);
      if (dto.received === ENUM.ORDER.RECEIVE.check) console.log(ENUM.ORDER.RECEIVE.check);
      if (dto.received === ENUM.ORDER.RECEIVE.complete) console.log(ENUM.ORDER.RECEIVE.complete);
      if (dto.received === ENUM.ORDER.RECEIVE.exchange) console.log(ENUM.ORDER.RECEIVE.exchange);
      if (dto.received === ENUM.ORDER.RECEIVE.fake) console.log(ENUM.ORDER.RECEIVE.fake);
      if (item === null) {
        item = new ErrorUtil(404).send({
          error: 'Receive cannot be changed.',
          payload: { receive: dto.received, codeOrder: dto.codeOrder },
        });
      }

      if ('status' in item) return item;

      return item;
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
      let item: SendErrorUtil | Entity;
      const expect: SendErrorUtil | Entity = await this.repository.findOrder(dto);
      if ('status' in expect) return expect;

      if (dto.exchange === ENUM.ORDER.EXCHANGE.expectation)
        console.log(ENUM.ORDER.EXCHANGE.expectation);
      if (dto.exchange === ENUM.ORDER.EXCHANGE.check) console.log(ENUM.ORDER.EXCHANGE.check);
      if (dto.exchange === ENUM.ORDER.EXCHANGE.ok) console.log(ENUM.ORDER.EXCHANGE.ok);
      if (dto.exchange === ENUM.ORDER.EXCHANGE.refundable)
        console.log(ENUM.ORDER.EXCHANGE.refundable);
      if (dto.exchange === ENUM.ORDER.EXCHANGE.no_refund)
        console.log(ENUM.ORDER.EXCHANGE.no_refund);

      if (item === null) {
        item = new ErrorUtil(404).send({
          error: 'Exchange cannot be changed.',
          payload: { exchange: dto.exchange, codeOrder: dto.codeOrder },
        });
      }

      if ('status' in item) return item;

      return item;
    } catch (error) {
      return new ErrorUtil(502).send({
        error: 'OrderService.exchange something wrong.',
        payload: error,
      });
    }
  };
}
