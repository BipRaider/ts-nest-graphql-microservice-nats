import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

import { OrderContract } from '@common/contracts';
import { ErrorUtil, SendErrorUtil } from '@common/utils';
import { ENUM, IJwtGenerateToken } from '@common/interface';

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
  PaidOrderInput,
  PaidOrderResponse,
  UpdateOrderInput,
  UpdateOrderResponse,
} from './dto/input';
import { AuthRole, CurrentUser } from '../../decorator';

@Resolver(of => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}
  //List queries func.
  @Query(returns => FindOrderResponse)
  @AuthRole(ENUM.Roles.USER)
  async findOrder(
    @Args('input') input: FindOrderInput,
    @CurrentUser() user: IJwtGenerateToken,
  ): Promise<OrderContract.FindQuery.Response | GraphQLError> {
    const payload: OrderContract.FindQuery.Response | SendErrorUtil = await this.orderService.find({
      ...input,
      finderId: user.id,
    });

    if ('status' in payload) return new ErrorUtil(payload.status).response(payload);

    return payload;
  }

  @Query(returns => [GetOrdersResponse])
  @AuthRole(ENUM.Roles.USER)
  async getOrders(
    @Args('input') input: GetOrdersInput,
    @CurrentUser() user: IJwtGenerateToken,
  ): Promise<OrderContract.GetQuery.Response[] | GraphQLError> {
    const payload: OrderContract.GetQuery.Response[] | SendErrorUtil = await this.orderService.get({
      ...input,
      finderId: user.id,
    });

    if ('status' in payload) return new ErrorUtil(payload.status).response(payload);

    return payload;
  }

  @Query(returns => [AllOrdersResponse])
  @AuthRole(ENUM.Roles.USER)
  async allOrders(
    @Args('input') input: AllOrdersInput,
    @CurrentUser() user: IJwtGenerateToken,
  ): Promise<OrderContract.AllQuery.Response[] | GraphQLError> {
    const payload: OrderContract.AllQuery.Response[] | SendErrorUtil = await this.orderService.all({
      ...input,
      finderId: user.id,
    });

    if ('status' in payload) return new ErrorUtil(payload.status).response(payload);

    return payload;
  }

  //List mutation func.
  @Mutation(returns => CreateOrderResponse)
  @AuthRole(ENUM.Roles.USER)
  async createOrder(
    @Args('input') input: CreateOrderInput,
    @CurrentUser() user: IJwtGenerateToken,
  ): Promise<OrderContract.CreateCommand.Response | GraphQLError> {
    const payload: OrderContract.CreateCommand.Response | SendErrorUtil =
      await this.orderService.create({ ...input, customer: user.id });

    if ('status' in payload) return new ErrorUtil(payload.status).response(payload);

    return payload;
  }

  @Mutation(returns => UpdateOrderResponse)
  @AuthRole(ENUM.Roles.USER)
  async updateOrder(
    @Args('input') input: UpdateOrderInput,
    @CurrentUser() user: IJwtGenerateToken,
  ): Promise<OrderContract.UpdateCommand.Response | GraphQLError> {
    const payload: OrderContract.UpdateCommand.Response | SendErrorUtil =
      await this.orderService.update({ ...input, customer: user.id });

    if ('status' in payload) return new ErrorUtil(payload.status).response(payload);

    return payload;
  }

  @Mutation(returns => PaidOrderResponse)
  @AuthRole(ENUM.Roles.USER)
  async updateOrderPaid(
    @Args('input') input: PaidOrderInput,
    @CurrentUser() user: IJwtGenerateToken,
  ): Promise<OrderContract.ReceiptPaidCommand.Response | GraphQLError> {
    console.log('updateOrderPaid', user);

    const payload: OrderContract.ReceiptPaidCommand.Response | SendErrorUtil =
      await this.orderService.paid(input);
    if ('status' in payload) return new ErrorUtil(payload.status).response(payload);

    return payload;
  }
}
