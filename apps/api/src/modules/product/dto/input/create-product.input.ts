import { InputType, Field, ObjectType, PartialType, Int } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  IsMongoId,
  Max,
  Min,
  IsInt,
  IsBoolean,
} from 'class-validator';

import { ProductContract } from '@common/contracts';

import { BaseModel } from '../../../base.model';
import { Schema } from 'mongoose';

@InputType()
export class CreateProductInput implements ProductContract.CreateCommand.Request {
  @Field(() => Schema.Types.ObjectId)
  @IsNotEmpty()
  @IsMongoId({ message: 'The userId is incorrect' })
  userId: Schema.Types.ObjectId;

  @Field(() => Schema.Types.ObjectId)
  @IsNotEmpty()
  @IsMongoId({ message: 'The storeId is incorrect' })
  storeId: Schema.Types.ObjectId;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt({ message: 'The price is incorrect' })
  @Max(10_000_000)
  price?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt({ message: 'The amount is incorrect' })
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

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean({ message: 'The isRemove is incorrect' })
  isRemove?: boolean;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'The name is incorrect' })
  @Length(1, 40)
  name?: string;
}

@ObjectType()
export class CreateProductResponse
  extends PartialType(BaseModel)
  implements Partial<ProductContract.CreateCommand.Response> {}
