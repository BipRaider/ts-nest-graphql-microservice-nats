import { Injectable } from '@nestjs/common';

import { OrderContract } from '@common/contracts';
import { SendErrorUtil, ErrorUtil } from '@common/utils';

import { IOrderService } from './types';
import { Entity } from './order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService implements IOrderService {
  constructor(private readonly repository: OrderRepository) {}

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
}
