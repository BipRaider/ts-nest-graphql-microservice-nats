import { InputType, Field, ObjectType, PartialType } from '@nestjs/graphql';
import { IsString, Length, IsMongoId, IsEnum, IsNotEmpty, IsDate } from 'class-validator';
import { Schema, ObjectId } from 'mongoose';

import { ENUM } from '@common/interface';
import { OrderContract } from '@common/contracts';

import { Order } from '../order.model';

@InputType()
export class PaidOrderInput implements OrderContract.ReceiptPaidCommand.Request {
  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsString({ message: 'The codeReceipt is incorrect' })
  public codeReceipt: string;

  @Field(() => Date, { nullable: true })
  @IsNotEmpty()
  @IsDate()
  public paidDate: Date;

  @Field(() => Schema.Types.ObjectId, { nullable: true })
  @IsNotEmpty()
  @IsMongoId({ message: 'The customer is incorrect' })
  public customer: ObjectId;

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsString({ message: 'The codeOrder is incorrect' })
  @Length(14, 14)
  public readonly codeOrder: string;

  @Field(() => ENUM.ORDER.PAID, { nullable: true })
  @IsNotEmpty()
  @IsEnum(ENUM.ORDER.PAID, {
    message: `The paid is incorrect and should have: ${Object.values(ENUM.ORDER.PAID).toString()}`,
  })
  public paid: ENUM.ORDER.PAID;
}

@ObjectType()
export class PaidOrderResponse
  extends PartialType(Order)
  implements Partial<OrderContract.AllQuery.Response> {}
