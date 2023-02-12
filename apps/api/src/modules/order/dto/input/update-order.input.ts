import { InputType, Field, ObjectType, PartialType } from '@nestjs/graphql';
import { IsOptional, IsBoolean, IsMongoId, IsEnum, IsNotEmpty } from 'class-validator';
import { Schema, ObjectId } from 'mongoose';

import { ENUM } from '@common/interface';
import { OrderContract } from '@common/contracts';

import { Order } from '../order.model';

@InputType()
export class UpdateOrderInput implements OrderContract.UpdateCommand.Request {
  @Field(() => Schema.Types.ObjectId)
  @IsNotEmpty()
  @IsMongoId({ message: 'The customer is incorrect' })
  id: ObjectId;

  @Field(() => ENUM.ORDER.PAID, { nullable: true })
  @IsOptional()
  @IsEnum(ENUM.ORDER.PAID, {
    message: `The paid is incorrect and should have: ${Object.values(ENUM.ORDER.PAID).toString()}`,
  })
  public paid?: ENUM.ORDER.PAID;

  @Field(() => ENUM.ORDER.PROCESS, { nullable: true })
  @IsOptional()
  @IsEnum(ENUM.ORDER.PROCESS, {
    message: `The processed is incorrect and should have: ${Object.values(
      ENUM.ORDER.PROCESS,
    ).toString()}`,
  })
  public processed?: ENUM.ORDER.PROCESS;

  @Field(() => ENUM.ORDER.SEND, { nullable: true })
  @IsOptional()
  @IsEnum(ENUM.ORDER.SEND, {
    message: `The send is incorrect and should have: ${Object.values(ENUM.ORDER.SEND).toString()}`,
  })
  public send?: ENUM.ORDER.SEND;

  @Field(() => ENUM.ORDER.RECEIVE, { nullable: true })
  @IsOptional()
  @IsEnum(ENUM.ORDER.RECEIVE, {
    message: `The received is incorrect and should have: ${Object.values(
      ENUM.ORDER.RECEIVE,
    ).toString()}`,
  })
  public received?: ENUM.ORDER.RECEIVE;

  @Field(() => ENUM.ORDER.EXCHANGE, { nullable: true })
  @IsOptional()
  @IsEnum(ENUM.ORDER.EXCHANGE, {
    message: `The exchange is incorrect and should have: ${Object.values(
      ENUM.ORDER.EXCHANGE,
    ).toString()}`,
  })
  public exchange?: ENUM.ORDER.EXCHANGE;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean({ message: 'The isRemove is incorrect' })
  public isCancel?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean({ message: 'The isRemove is incorrect' })
  public isState?: boolean;
}

@ObjectType()
export class UpdateOrderResponse
  extends PartialType(Order)
  implements Partial<OrderContract.UpdateCommand.Response> {}
