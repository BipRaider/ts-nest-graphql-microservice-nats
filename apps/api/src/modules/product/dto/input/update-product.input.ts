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
  IsNotEmpty,
} from 'class-validator';
import { Schema, ObjectId } from 'mongoose';

import { ProductContract } from '@common/contracts';

import { Product } from '../product.model';
import { IsPrise } from '../../../../decorator';

@InputType()
export class UpdateProductInput implements ProductContract.UpdateCommand.Request {
  @Field(() => Schema.Types.ObjectId)
  @IsNotEmpty()
  @IsMongoId({ message: 'The Id is incorrect' })
  id: ObjectId;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean({ message: 'The isRemove is incorrect' })
  isRemove?: boolean;

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
}

@ObjectType()
export class UpdateProductResponse
  extends PartialType(Product)
  implements Partial<ProductContract.UpdateCommand.Response> {}
