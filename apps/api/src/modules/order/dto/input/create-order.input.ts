import { InputType, Field, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { IsNotEmpty, IsMongoId, IsArray } from 'class-validator';
import { Schema, ObjectId } from 'mongoose';

import { OrderContract } from '@common/contracts';

import { Order } from '../order.model';

@InputType()
export class CreateOrderInput implements OrderContract.CreateCommand.Request {
  @Field(() => Schema.Types.ObjectId)
  @IsNotEmpty()
  @IsMongoId({ message: 'The customer is incorrect' })
  customer: ObjectId;

  @Field(() => [Schema.Types.ObjectId])
  @IsNotEmpty()
  @IsArray({ message: 'The products is incorrect' })
  @IsMongoId({ message: 'The products id is incorrect', each: true })
  products: ObjectId[];
}

@ObjectType()
export class CreateOrderResponse
  extends PartialType(
    PickType(Order, ['paid', 'price', 'codeOrder', 'id', 'created', 'updated'] as const),
  )
  implements Partial<OrderContract.CreateCommand.Response> {}
