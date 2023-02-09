import { InputType, Field, ObjectType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsMongoId, IsString, ValidateIf } from 'class-validator';
import { Schema, ObjectId } from 'mongoose';

import { OrderContract } from '@common/contracts';

import { Order } from '../order.model';

@InputType()
export class FindOrderInput implements OrderContract.FindQuery.Request {
  @Field(() => Schema.Types.ObjectId, { nullable: true })
  @IsNotEmpty()
  @IsMongoId({ message: 'The Id is incorrect' })
  id: ObjectId;

  @Field(() => String, { nullable: true })
  @ValidateIf(prop => (prop.id ? false : true))
  @IsNotEmpty()
  @IsString({ message: 'The Id is incorrect' })
  codeOrder: string;
}

@ObjectType()
export class FindProductResponse
  extends PartialType(Order)
  implements Partial<OrderContract.GetQuery.Response> {}
