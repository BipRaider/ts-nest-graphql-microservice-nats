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
    if (entity.id) item = await this.db.findById(entity.id).select({}).exec();

    return item;
  };

  public get = async (entity?: Entity): Promise<ISchema[] | null> => {
    if (entity.userId && entity.storeId) return await this.findFromDB(entity);
    if (entity.userId) return await this.findFromDB(entity);
    if (entity.storeId) return await this.findFromDB(entity);
    return null;
  };

  public all = async (entity: Entity): Promise<ISchema[]> => await this.findFromDB(entity);

  private findFromDB = async (entity: Entity): Promise<ISchema[]> => {
    return await this.db.find(entity.find()).skip(entity.skip).limit(entity.limit).exec();
  };

  public update = async (entity: Entity): Promise<ISchema | null> => {
    if (!entity.id) return null;
    const set = entity.updateDB();
    return await this.db.findByIdAndUpdate(entity.id, { $set: set }, { new: true }).exec();
  };
}
