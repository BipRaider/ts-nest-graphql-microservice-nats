import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

import { UserContract } from '@common/contracts';
import { ErrorUtil, SendErrorUtil } from '@common/utils';

import { CreateUserInput, CreateUserResponse } from './dto/input/create-user.input';
import { GetUserInput, GetUserResponse } from './dto/input/get-user.input';

import { User } from './dto/user.model';
import { UsersService } from './users.service';
import { GetUsersInput } from './dto/input/get-users.input';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  //List queries func.
  @Query(returns => GetUserResponse)
  async getUser(
    @Args('data') data: GetUserInput,
  ): Promise<UserContract.GetUserQuery.Response | GraphQLError> {
    const user: UserContract.GetUserQuery.Response | SendErrorUtil = await this.usersService.find(
      data,
    );

    if ('status' in user) return new ErrorUtil(user.status).response(user);

    return user;
  }

  @Query(returns => [GetUserResponse])
  async getUsers(
    @Args('data') data: GetUsersInput,
  ): Promise<UserContract.GetUsersQuery.Response[] | GraphQLError> {
    const user: UserContract.GetUsersQuery.Response[] | SendErrorUtil = await this.usersService.get(
      data,
    );

    if ('status' in user) return new ErrorUtil(user.status).response(user);

    return user;
  }

  //List mutation func.
  @Mutation(returns => CreateUserResponse)
  async createUser(
    @Args('input') input: CreateUserInput,
  ): Promise<UserContract.CreateCommand.Response | GraphQLError> {
    const user: UserContract.CreateCommand.Response | SendErrorUtil =
      await this.usersService.create(input);

    if ('status' in user) return new ErrorUtil(user.status).response(user);

    return user;
  }
}
