import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ENUM } from '@common/interface';

import { ISchema } from './order.schema';
import { Entity } from './order.entity';
import { IOrderRepository } from './types';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectModel(ENUM.MongoSchemaNames.ORDER, ENUM.MongoCollectionNames.ORDER)
    private readonly db: Model<ISchema>,
  ) {}

  public create = async (entity: Entity): Promise<ISchema | null> => {
    const item = new this.db(entity.create());
    return item.save();
  };

  public find = async (entity: Entity): Promise<ISchema | null> => {
    if (entity.id) return await this.db.findById(entity.id).exec();
    if (entity.codeOrder) return await this.db.findOne({ codeOrder: entity.codeOrder }).exec();
    return null;
  };

  public get = async (entity?: Entity): Promise<ISchema[] | null> => {
    if (entity.customer) return await this.findFromDB(entity);
    return null;
  };

  public all = async (entity: Entity): Promise<ISchema[]> => await this.findFromDB(entity);

  public update = async (entity: Entity): Promise<ISchema | null> => {
    if (!entity.id) return null;
    const set = entity.updateDB();
    return await this.db.findByIdAndUpdate(entity.id, { $set: set }, { new: true }).exec();
  };

  private findFromDB = async (entity: Entity): Promise<ISchema[]> => {
    return await this.db.find(entity.find()).skip(entity.skip).limit(entity.limit).exec();
  };
}
