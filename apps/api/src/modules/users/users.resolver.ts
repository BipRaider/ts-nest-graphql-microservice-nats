import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

import { UserContract } from '@common/contracts';
import { ErrorUtil, SendErrorUtil } from '@common/utils';
import { ENUM, IJwtGenerateToken } from '@common/interface';

import { AuthRole, CurrentUser } from '../../decorator';
import { UsersService } from './users.service';
import { User } from './dto/user.model';
import { CreateUserInput, CreateUserResponse } from './dto/input/create-user.input';
import { GetUserInput, GetUserResponse } from './dto/input/get-user.input';
import { UpdateUserInput, UpdateUserResponse } from './dto/input/update-user.input';
import { GetUsersInput, GetUsersResponse } from './dto/input/get-users.input';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  //List queries func.
  @Query(returns => GetUserResponse)
  @AuthRole(ENUM.Roles.USER)
  async getUser(
    @Args('input') input: GetUserInput,
    @CurrentUser() currentUser: IJwtGenerateToken,
  ): Promise<UserContract.GetUserQuery.Response | GraphQLError> {
    const user: UserContract.GetUserQuery.Response | SendErrorUtil = await this.usersService.find({
      ...input,
      finderId: currentUser.id,
    });

    if ('status' in user) return new ErrorUtil(user.status).response(user);

    return user;
  }

  @Query(returns => [GetUsersResponse])
  @AuthRole(ENUM.Roles.USER)
  async getUsers(
    @Args('input') input: GetUsersInput,
    @CurrentUser() currentUser: IJwtGenerateToken,
  ): Promise<UserContract.GetUsersQuery.Response[] | GraphQLError> {
    const user: UserContract.GetUsersQuery.Response[] | SendErrorUtil = await this.usersService.get(
      { ...input, finderId: currentUser.id },
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

  @Mutation(returns => UpdateUserResponse)
  @AuthRole(ENUM.Roles.USER)
  async updateUser(
    @Args('input') input: UpdateUserInput,
    @CurrentUser() currentUser: IJwtGenerateToken,
  ): Promise<UserContract.UpdateCommand.Response | GraphQLError> {
    const user: UserContract.UpdateCommand.Response | SendErrorUtil =
      await this.usersService.update({ ...input, id: currentUser.id });

    if ('status' in user) return new ErrorUtil(user.status).response(user);

    return user;
  }
}
