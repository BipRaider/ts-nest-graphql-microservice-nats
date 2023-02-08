import { InputType, Field, ObjectType, PartialType, Int, Float } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  IsMongoId,
  Max,
  Min,
  IsInt,
} from 'class-validator';
import { Schema } from 'mongoose';

import { ProductContract } from '@common/contracts';

import { BaseModel } from '../../../base.model';
import { IsPrise } from '../../../../decorator';

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

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsPrise(2, { message: 'The price is incorrect' })
  @Min(0)
  @Max(10_000_000)
  price?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt({ message: 'The amount is incorrect' })
  @Max(10_000_000)
  @Min(0)
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
  @Min(0)
  discount?: number;

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
