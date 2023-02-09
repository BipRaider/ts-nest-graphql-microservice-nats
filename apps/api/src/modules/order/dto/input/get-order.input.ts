import { InputType, Field, ObjectType, PartialType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsMongoId, IsOptional, IsInt, Min } from 'class-validator';
import { Schema, ObjectId } from 'mongoose';

import { OrderContract } from '@common/contracts';

import { Order } from '../order.model';

@InputType()
export class GetOrdersInput implements OrderContract.GetQuery.Request {
  @Field(() => Schema.Types.ObjectId, { nullable: true })
  @IsNotEmpty()
  @IsMongoId({ message: 'The customer is incorrect' })
  customer: ObjectId;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt({ message: 'The skip is incorrect' })
  @Min(0, { message: 'The skip is incorrect' })
  skip: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt({ message: 'The limit is incorrect' })
  @Min(0, { message: 'The limit is incorrect' })
  limit: number;
}

@ObjectType()
export class GetOrdersResponse
  extends PartialType(Order)
  implements Partial<OrderContract.GetQuery.Response> {}
