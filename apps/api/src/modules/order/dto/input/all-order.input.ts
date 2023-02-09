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
} from 'class-validator';
import { Schema, ObjectId } from 'mongoose';

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
  @IsString({ message: 'The description is incorrect' })
  @Length(10, 10)
  public readonly codeOrder?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsPrise(5, { message: 'The price is incorrect' })
  @Min(0)
  @Max(10_000_000)
  public price?: number;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean({ message: 'The isRemove is incorrect' })
  public paid?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean({ message: 'The isRemove is incorrect' })
  public processed?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean({ message: 'The isRemove is incorrect' })
  public send?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean({ message: 'The isRemove is incorrect' })
  public received?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean({ message: 'The isRemove is incorrect' })
  public exchange?: boolean;

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
