import { Field, ObjectType, Float, registerEnumType } from '@nestjs/graphql';
import { ObjectId, Schema } from 'mongoose';

import { IBaseData, IOrder, ENUM } from '@common/interface';

import { BaseModel } from '../../base.model';

registerEnumType(ENUM.ORDER.PAID, {
  name: 'ORDER_PAID',
  description: 'State variables of payment.',
});
registerEnumType(ENUM.ORDER.EXCHANGE, {
  name: 'ORDER_EXCHANGE',
  description: 'State variables of exchange.',
});
registerEnumType(ENUM.ORDER.PROCESS, {
  name: 'ORDER_PROCESS',
  description: 'State variables of process.',
});
registerEnumType(ENUM.ORDER.RECEIVE, {
  name: 'ORDER_RECEIVE',
  description: 'State variables of receive.',
});
registerEnumType(ENUM.ORDER.SEND, {
  name: 'ORDER_SEND',
  description: 'State variables of send.',
});

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

  //State
  @Field(() => ENUM.ORDER.PAID, { nullable: true })
  public readonly paid: ENUM.ORDER.PAID;
  @Field(() => ENUM.ORDER.PROCESS, { nullable: true })
  public readonly processed: ENUM.ORDER.PROCESS;
  @Field(() => ENUM.ORDER.SEND, { nullable: true })
  public readonly send: ENUM.ORDER.SEND;
  @Field(() => ENUM.ORDER.RECEIVE, { nullable: true })
  public readonly received: ENUM.ORDER.RECEIVE;
  @Field(() => ENUM.ORDER.EXCHANGE, { nullable: true })
  public readonly exchange: ENUM.ORDER.EXCHANGE;

  @Field(() => Boolean, { nullable: true })
  public readonly isCancel: boolean;
  @Field(() => Boolean, { nullable: true })
  public readonly isState: boolean;
}
