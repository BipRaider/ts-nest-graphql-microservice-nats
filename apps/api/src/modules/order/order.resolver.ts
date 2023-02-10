import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

import { OrderContract } from '@common/contracts';
import { ErrorUtil, SendErrorUtil } from '@common/utils';

import { Order } from './dto/order.model';
import { OrderService } from './order.service';
import {
  AllOrdersInput,
  AllOrdersResponse,
  CreateOrderInput,
  CreateOrderResponse,
  FindOrderInput,
  FindOrderResponse,
  GetOrdersInput,
  GetOrdersResponse,
} from './dto/input';
import { AuthRole } from '../../decorator';
import { ENUM } from '@common/interface';

@Resolver(of => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}
  //List queries func.
  @Query(returns => FindOrderResponse)
  async findOrder(
    @Args('data') data: FindOrderInput,
  ): Promise<OrderContract.FindQuery.Response | GraphQLError> {
    const payload: OrderContract.FindQuery.Response | SendErrorUtil = await this.orderService.find(
      data,
    );

    if ('status' in payload) return new ErrorUtil(payload.status).response(payload);

    return payload;
  }

  @Query(returns => [GetOrdersResponse])
  async getOrders(
    @Args('data') data: GetOrdersInput,
  ): Promise<OrderContract.GetQuery.Response[] | GraphQLError> {
    const payload: OrderContract.GetQuery.Response[] | SendErrorUtil = await this.orderService.get(
      data,
    );

    if ('status' in payload) return new ErrorUtil(payload.status).response(payload);

    return payload;
  }

  @Query(returns => [AllOrdersResponse])
  async allOrders(
    @Args('data') data: AllOrdersInput,
  ): Promise<OrderContract.AllQuery.Response[] | GraphQLError> {
    const payload: OrderContract.AllQuery.Response[] | SendErrorUtil = await this.orderService.all(
      data,
    );

    if ('status' in payload) return new ErrorUtil(payload.status).response(payload);

    return payload;
  }

  //List mutation func.
  @Mutation(returns => CreateOrderResponse)
  @AuthRole(ENUM.Roles.USER)
  async createOrder(
    @Args('input') input: CreateOrderInput,
  ): Promise<OrderContract.CreateCommand.Response | GraphQLError> {
    const payload: OrderContract.CreateCommand.Response | SendErrorUtil =
      await this.orderService.create(input);

    if ('status' in payload) return new ErrorUtil(payload.status).response(payload);

    return payload;
  }
}
