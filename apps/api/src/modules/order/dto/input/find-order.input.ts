import { InputType, Field, ObjectType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsMongoId, IsString, ValidateIf, Length } from 'class-validator';
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
  @IsString({ message: 'The codeOrder is incorrect' })
  @Length(14, 14)
  codeOrder: string;
}

@ObjectType()
export class FindOrderResponse
  extends PartialType(Order)
  implements Partial<OrderContract.GetQuery.Response> {}
