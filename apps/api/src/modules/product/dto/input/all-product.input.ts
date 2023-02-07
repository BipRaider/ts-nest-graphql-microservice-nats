import { InputType, Field, ObjectType, Int, PartialType } from '@nestjs/graphql';
import { IsInt, Min, IsOptional } from 'class-validator';

import { ProductContract } from '@common/contracts';

import { Product } from '../product.model';

@InputType()
export class AllProductsInput implements ProductContract.AllQuery.Request {
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
export class AllProductsResponse
  extends PartialType(Product)
  implements Partial<ProductContract.AllQuery.Response> {}
