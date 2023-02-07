import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ENUM } from '@common/interface';

import { ISchema } from './product.schema';
import { Entity } from './product.entity';
import { IProductRepository } from './types';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectModel(ENUM.MongoSchemaNames.PRODUCT, ENUM.MongoCollectionNames.PRODUCT)
    private readonly db: Model<ISchema>,
  ) {}

  public create = async (entity: Entity): Promise<ISchema | null> => {
    const item = new this.db(entity.create());
    return item.save();
  };

  public find = async (entity: Entity): Promise<ISchema | null> => {
    let item: ISchema | null = null;
    if (entity.id) item = await this.db.findById(entity.id).select({ password: 0 }).exec();
    return item;
  };

  public get = async (entity?: Entity): Promise<ISchema[] | null> => {
    let item: ISchema[] | null = null;
    if (entity.userId) {
      item = await this.db.find({ userId: entity.userId }).skip(entity.skip).limit(entity.limit).select({}).exec();
    }
    if (entity.storeId) {
      item = await this.db.find({ storeId: entity.storeId }).skip(entity.skip).limit(entity.limit).select({}).exec();
    }
    return item;
  };

  public all = async (entity: Entity): Promise<ISchema[]> => {
    return await this.db.find().skip(entity.skip).limit(entity.limit).select({}).exec();
  };
}
