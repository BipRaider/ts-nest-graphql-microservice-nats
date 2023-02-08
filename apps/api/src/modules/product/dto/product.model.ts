import { Field, Int, ObjectType, Float } from '@nestjs/graphql';

import { IBaseData, IProduct } from '@common/interface';

import { BaseModel } from '../../base.model';
import { ObjectId, Schema } from 'mongoose';

@ObjectType()
export class Product extends BaseModel implements IProduct, IBaseData {
  @Field(() => Schema.Types.ObjectId, { nullable: true })
  public readonly userId: ObjectId;

  @Field(() => Schema.Types.ObjectId, { nullable: true })
  public readonly storeId: ObjectId;

  @Field(() => Float, { nullable: true })
  public readonly price: number;

  @Field(() => Int, { nullable: true })
  public readonly amount: number;

  @Field(() => Int, { nullable: true })
  public readonly discount: number;

  @Field(() => String, { nullable: true })
  public readonly description: string;

  @Field(() => String, { nullable: true })
  public readonly name: string;

  @Field(() => Boolean, { nullable: true })
  public readonly isRemove: boolean;
}
