import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

import { ProductContract } from '@common/contracts';
import { ErrorUtil, SendErrorUtil } from '@common/utils';
import { ENUM, IJwtGenerateToken } from '@common/interface';

import { ProductService } from './product.service';
import { Product } from './dto/product.model';
import {
  AllProductsInput,
  AllProductsResponse,
  CreateProductInput,
  CreateProductResponse,
  FindProductInput,
  FindProductResponse,
  GetProductsInput,
  GetProductsResponse,
  UpdateProductInput,
  UpdateProductResponse,
} from './dto/input';
import { AuthRoles, AuthRole, CurrentUser } from '../../decorator';

@Resolver(of => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}
  //List queries func.
  @Query(returns => FindProductResponse)
  async findProduct(
    @Args('data') data: FindProductInput,
  ): Promise<ProductContract.FindQuery.Response | GraphQLError> {
    const payload: ProductContract.FindQuery.Response | SendErrorUtil =
      await this.productService.find(data);

    if ('status' in payload) return new ErrorUtil(payload.status).response(payload);

    return payload;
  }

  @Query(returns => [GetProductsResponse])
  async getProducts(
    @Args('data') data: GetProductsInput,
  ): Promise<ProductContract.GetQuery.Response[] | GraphQLError> {
    const payload: ProductContract.GetQuery.Response[] | SendErrorUtil =
      await this.productService.get(data);

    if ('status' in payload) return new ErrorUtil(payload.status).response(payload);

    return payload;
  }

  @Query(returns => [AllProductsResponse])
  async allProducts(
    @Args('data') data: AllProductsInput,
  ): Promise<ProductContract.AllQuery.Response[] | GraphQLError> {
    const payload: ProductContract.AllQuery.Response[] | SendErrorUtil =
      await this.productService.all(data);

    if ('status' in payload) return new ErrorUtil(payload.status).response(payload);

    return payload;
  }

  //List mutation func.
  @Mutation(returns => CreateProductResponse)
  // @AuthRoles([ENUM.Roles.ADMIN, ENUM.Roles.MERCHANT])
  @AuthRole(ENUM.Roles.USER)
  async createProduct(
    @Args('input') input: CreateProductInput,
    @CurrentUser() currentUser: IJwtGenerateToken,
  ): Promise<ProductContract.CreateCommand.Response | GraphQLError> {
    const payload: ProductContract.CreateCommand.Response | SendErrorUtil =
      await this.productService.create({ ...input, userId: currentUser.id });

    if ('status' in payload) return new ErrorUtil(payload.status).response(payload);

    return payload;
  }

  @Mutation(returns => UpdateProductResponse)
  @AuthRole(ENUM.Roles.USER)
  async updateProduct(
    @Args('input') input: UpdateProductInput,
    @CurrentUser() currentUser: IJwtGenerateToken,
  ): Promise<ProductContract.UpdateCommand.Response | GraphQLError> {
    const payload: ProductContract.UpdateCommand.Response | SendErrorUtil =
      await this.productService.update({ ...input, userId: currentUser.id });

    if ('status' in payload) return new ErrorUtil(payload.status).response(payload);

    return payload;
  }
}
