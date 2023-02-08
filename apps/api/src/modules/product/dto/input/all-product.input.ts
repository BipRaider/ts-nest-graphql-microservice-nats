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
import { Schema } from 'mongoose';

import { ProductContract } from '@common/contracts';

import { Product } from '../product.model';
import { IsPrise } from '../../../../decorator';

@InputType()
export class AllProductsInput implements ProductContract.AllQuery.Request {
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

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean({ message: 'The isRemove is incorrect' })
  isRemove?: boolean;

  @Field(() => Schema.Types.ObjectId, { nullable: true })
  @IsOptional()
  @IsMongoId({ message: 'The userId is incorrect' })
  userId?: Schema.Types.ObjectId;

  @Field(() => Schema.Types.ObjectId, { nullable: true })
  @IsOptional()
  @IsMongoId({ message: 'The storeId is incorrect' })
  storeId?: Schema.Types.ObjectId;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsPrise(2, { message: 'The price is incorrect' })
  @Min(0)
  @Max(10_000_000)
  price?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt({ message: 'The amount is incorrect' })
  @Min(0)
  @Max(10_000_000)
  amount?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'The description is incorrect' })
  @Length(1, 200)
  description?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt({ message: 'The discount is incorrect' })
  @Max(100)
  @Min(1)
  discount?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'The name is incorrect' })
  @Length(1, 40)
  name?: string;
}

@ObjectType()
export class AllProductsResponse
  extends PartialType(Product)
  implements Partial<ProductContract.AllQuery.Response> {}
