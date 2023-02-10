import { InputType, Field, ObjectType, Int, PartialType, Float } from '@nestjs/graphql';
import {
  IsInt,
  Min,
  IsOptional,
  IsBoolean,
  IsString,
  Length,
  Max,
  IsMongoId,
  IsEnum,
} from 'class-validator';
import { Schema, ObjectId } from 'mongoose';

import { ENUM } from '@common/interface';
import { OrderContract } from '@common/contracts';

import { IsPrise } from '../../../../decorator';

import { Order } from '../order.model';

@InputType()
export class AllOrdersInput implements OrderContract.AllQuery.Request {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt({ message: 'The skip is incorrect' })
  @Min(0)
  skip?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt({ message: 'The limit is incorrect' })
  @Min(0)
  limit?: number;

  @Field(() => Schema.Types.ObjectId, { nullable: true })
  @IsOptional()
  @IsMongoId({ message: 'The customer is incorrect' })
  customer?: ObjectId;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'The codeOrder is incorrect' })
  @Length(14, 14)
  public readonly codeOrder?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsPrise(5, { message: 'The price is incorrect' })
  @Min(0)
  @Max(10_000_000)
  public price?: number;

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
export class AllOrdersResponse
  extends PartialType(Order)
  implements Partial<OrderContract.AllQuery.Response> {}
