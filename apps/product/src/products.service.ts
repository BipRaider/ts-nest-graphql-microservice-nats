import { Injectable } from '@nestjs/common';

import { ProductContract } from '@common/contracts';
import { SendErrorUtil, ErrorUtil } from '@common/utils';

import { IProductService } from './types';
import { Entity } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService implements IProductService {
  constructor(private readonly repository: ProductRepository) {}
  //TODO: Update fn.A product cannot be created with the same name for the same user.
  public create = async (
    dto: ProductContract.CreateCommand.Request,
  ): Promise<SendErrorUtil | Entity> => {
    try {
      const entity = new Entity(dto);
      if (!entity.userId && entity.storeId) {
        return new ErrorUtil(400).send({
          error: 'Some properties not found.',
          payload: { userId: entity.userId, storeId: entity.storeId },
        });
      }

      const item = await this.repository.create(entity);
      return new Entity(item);
    } catch (error) {
      return new ErrorUtil(502).send({
        error: 'ProductService.create something wrong.',
        payload: error,
      });
    }
  };

  public find = async (dto: ProductContract.FindQuery.Request): Promise<SendErrorUtil | Entity> => {
    try {
      const entity = new Entity(dto);
      const item = await this.repository.find(entity);
      if (!item) {
        return new ErrorUtil(404).send({
          error: 'Product not found.',
          payload: { id: entity.id },
        });
      }

      return new Entity(item);
    } catch (error) {
      return new ErrorUtil(502).send({
        error: 'ProductService.find something wrong.',
        payload: error,
      });
    }
  };

  public get = async (dto: ProductContract.GetQuery.Request): Promise<SendErrorUtil | Entity[]> => {
    try {
      const entity = new Entity(dto).paginate(dto);
      const items = await this.repository.get(entity);
      return items.map(item => new Entity(item));
    } catch (error) {
      return new ErrorUtil(502).send({
        error: 'ProductService.find something wrong.',
        payload: error,
      });
    }
  };

  public all = async (dto: ProductContract.AllQuery.Request): Promise<SendErrorUtil | Entity[]> => {
    try {
      const entity = new Entity(dto).paginate(dto);
      const items = await this.repository.all(entity);
      return items.map(item => new Entity(item));
    } catch (error) {
      return new ErrorUtil(502).send({
        error: 'ProductService.all something wrong.',
        payload: error,
      });
    }
  };
}
