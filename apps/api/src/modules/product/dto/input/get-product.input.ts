import { InputType, Field, ObjectType, PartialType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsMongoId, ValidateIf, IsOptional, IsInt, Min } from 'class-validator';
import { Schema, ObjectId } from 'mongoose';

import { ProductContract } from '@common/contracts';

import { Product } from '../product.model';

@InputType()
export class GetProductsInput implements ProductContract.GetQuery.Request {
  @Field(() => Schema.Types.ObjectId, { nullable: true })
  @IsOptional()
  @IsMongoId({ message: 'The Id is incorrect' })
  userId?: ObjectId;

  @Field(() => String, { nullable: true })
  @ValidateIf(prop => {
    return prop.userId ? false : true;
  })
  @IsNotEmpty()
  @IsMongoId({ message: 'The Id is incorrect' })
  storeId?: ObjectId;

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
export class GetProductsResponse
  extends PartialType(Product)
  implements Partial<ProductContract.GetQuery.Response> {}
