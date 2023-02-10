import { Inject, Injectable } from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';

import { OrderContract } from '@common/contracts';
import { SendErrorUtil, ErrorUtil } from '@common/utils';
import { ENUM } from '@common/interface';

import { IOrderService } from './types';
import { Entity } from './order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    private readonly repository: OrderRepository,
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

  public paid = async (
    dto: OrderContract.ReceiptPaidCommand.Request,
  ): Promise<SendErrorUtil | Entity> => {
    try {
      const entity = new Entity(dto);
      const exist = await this.repository.find(entity);
      if (!exist) {
        return new ErrorUtil(404).send({
          error: 'Order not found.',
          payload: { codeOrder: entity.codeOrder },
        });
      }

      const item = new Entity({ ...exist, ...dto, id: exist._id });
      const itemNew = await this.repository.update(item);

      this.exchequerClient.emit(`${ENUM.NatsServicesQueue.EXCHEQUER}.paid`, {
        ...dto,
        orderId: itemNew.id,
      });

      return new Entity(itemNew);
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
      const entity = new Entity(dto);
      const exist = await this.repository.find(entity);
      if (!exist) {
        return new ErrorUtil(404).send({
          error: 'Order not found.',
          payload: { codeOrder: entity.codeOrder },
        });
      }

      const item = new Entity({ ...exist, ...dto, id: exist._id });
      const itemNew = await this.repository.update(item);

      this.exchequerClient.emit(`${ENUM.NatsServicesQueue.EXCHEQUER}.processed`, {
        ...dto,
        orderId: itemNew.id,
      });

      return new Entity(itemNew);
    } catch (error) {
      return new ErrorUtil(502).send({
        error: 'OrderService.paid something wrong.',
        payload: error,
      });
    }
  };

  public send = async (dto: OrderContract.SendCommand.Request): Promise<SendErrorUtil | Entity> => {
    try {
      const entity = new Entity(dto);
      const exist = await this.repository.find(entity);
      if (!exist) {
        return new ErrorUtil(404).send({
          error: 'Order not found.',
          payload: { codeOrder: entity.codeOrder },
        });
      }

      const item = new Entity({ ...exist, ...dto, id: exist._id });
      const itemNew = await this.repository.update(item);

      this.exchequerClient.emit(`${ENUM.NatsServicesQueue.EXCHEQUER}.send`, {
        ...dto,
        orderId: itemNew.id,
      });

      return new Entity(itemNew);
    } catch (error) {
      return new ErrorUtil(502).send({
        error: 'OrderService.paid something wrong.',
        payload: error,
      });
    }
  };

  public receive = async (
    dto: OrderContract.ReceivedCommand.Request,
  ): Promise<SendErrorUtil | Entity> => {
    try {
      const entity = new Entity(dto);
      const exist = await this.repository.find(entity);
      if (!exist) {
        return new ErrorUtil(404).send({
          error: 'Order not found.',
          payload: { codeOrder: entity.codeOrder },
        });
      }

      const item = new Entity({ ...exist, ...dto, id: exist._id });
      const itemNew = await this.repository.update(item);

      this.exchequerClient.emit(`${ENUM.NatsServicesQueue.EXCHEQUER}.receive`, {
        ...dto,
        orderId: itemNew.id,
      });

      return new Entity(itemNew);
    } catch (error) {
      return new ErrorUtil(502).send({
        error: 'OrderService.paid something wrong.',
        payload: error,
      });
    }
  };

  public exchange = async (
    dto: OrderContract.ExchangeCommand.Request,
  ): Promise<SendErrorUtil | Entity> => {
    try {
      const entity = new Entity(dto);
      const exist = await this.repository.find(entity);
      if (!exist) {
        return new ErrorUtil(404).send({
          error: 'Order not found.',
          payload: { codeOrder: entity.codeOrder },
        });
      }

      const item = new Entity({ ...exist, ...dto, id: exist._id });
      const itemNew = await this.repository.update(item);

      this.exchequerClient.emit(`${ENUM.NatsServicesQueue.EXCHEQUER}.exchange`, {
        ...dto,
        orderId: itemNew.id,
      });

      return new Entity(itemNew);
    } catch (error) {
      return new ErrorUtil(502).send({
        error: 'OrderService.paid something wrong.',
        payload: error,
      });
    }
  };
}
