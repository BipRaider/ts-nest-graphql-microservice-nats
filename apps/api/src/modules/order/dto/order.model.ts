import { Field, ObjectType, Float } from '@nestjs/graphql';

import { IBaseData, IOrder } from '@common/interface';

import { BaseModel } from '../../base.model';
import { ObjectId, Schema } from 'mongoose';

@ObjectType()
export class Order extends BaseModel implements IOrder, IBaseData {
  @Field(() => Schema.Types.ObjectId, { nullable: true })
  public readonly customer: ObjectId;
  @Field(() => Schema.Types.ObjectId, { nullable: true })
  public readonly products: ObjectId[];
  @Field(() => String, { nullable: true })
  public readonly codeOrder: string;
  @Field(() => Float, { nullable: true })
  public readonly price: number;

  @Field(() => Boolean, { nullable: true })
  public readonly paid: boolean;
  @Field(() => Boolean, { nullable: true })
  public readonly processed: boolean;
  @Field(() => Boolean, { nullable: true })
  public readonly send: boolean;
  @Field(() => Boolean, { nullable: true })
  public readonly received: boolean;
  @Field(() => Boolean, { nullable: true })
  public readonly exchange: boolean;
  @Field(() => Boolean, { nullable: true })
  public readonly isCancel: boolean;
  @Field(() => Boolean, { nullable: true })
  public readonly isState: boolean;
}
