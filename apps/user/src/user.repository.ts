import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ENUM } from '@common/interface';

import { ISchema } from './user.schema';
import { Entity } from './user.entity';
import { IUserRepository } from './types';

@Injectable()
export class UsersRepository implements IUserRepository {
  constructor(
    @InjectModel(ENUM.MongoSchemaNames.USER, ENUM.MongoCollectionNames.USER)
    private readonly db: Model<ISchema>,
  ) {}

  async create(entity: Entity): Promise<ISchema | null> {
    const user = new this.db(entity.create());
    return user.save();
  }

  public find = async (entity: Entity): Promise<ISchema | null> => {
    let item: ISchema | null = null;

    if (entity.id) item = await this.db.findById(entity.id).select({ password: 0 }).exec();
    if (entity.email && !item)
      item = await this.db.findOne({ email: entity.email }).select({ password: 0 }).exec();

    return item;
  };

  public get = async (entity?: Entity): Promise<ISchema[] | null> => {
    return await this.db
      .find()
      .skip(entity.skip)
      .limit(entity.limit)
      .select({ password: 0 })
      .exec();
  };

  public auth = async (entity: Entity): Promise<ISchema | null> => {
    let item: ISchema | null = null;

    if (entity.email) item = await this.db.findOne({ email: entity.email }).exec();

    return item;
  };

  public update = async (entity: Entity): Promise<ISchema | null> => {
    if (!entity.id) return null;
    const set = entity.updateDB();

    return await this.db
      .findByIdAndUpdate(
        entity.id,
        {
          $set: set,
          $addToSet: { roles: entity.roles },
        },
        { new: true },
      )
      .exec();
  };
}
