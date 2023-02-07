import { InputType, Field, ObjectType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsMongoId } from 'class-validator';
import { Schema, ObjectId } from 'mongoose';

import { ProductContract } from '@common/contracts';

import { Product } from '../product.model';

@InputType()
export class FindProductInput implements ProductContract.FindQuery.Request {
  @Field(() => Schema.Types.ObjectId)
  @IsNotEmpty()
  @IsMongoId({ message: 'The Id is incorrect' })
  id: ObjectId;
}

@ObjectType()
export class FindProductResponse
  extends PartialType(Product)
  implements Partial<ProductContract.GetQuery.Response> {}
