import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { SendErrorUtil } from '@common/utils';

import { AuthContract, UserContract } from '@common/contracts';

import { IUserController } from './types';
import { UserService } from './user.service';
import { Entity } from './user.entity';

@Controller()
export class UserController implements IUserController {
  constructor(private readonly usersService: UserService) {}

  @MessagePattern(UserContract.CreateCommand.Pattern)
  public async create(
    @Payload() payload: UserContract.CreateCommand.Payload,
  ): Promise<UserContract.CreateCommand.Response | SendErrorUtil> {
    const user: Entity | SendErrorUtil = await this.usersService.create(payload);

    if ('status' in user) return user;

    return {
      created: user.created,
      updated: user.updated,
      id: user.id,
    };
  }

  @MessagePattern(UserContract.GetUserQuery.Pattern)
  public async find(
    @Payload() payload: UserContract.GetUserQuery.Payload,
  ): Promise<UserContract.GetUserQuery.Response | SendErrorUtil> {
    const user: Entity | SendErrorUtil = await this.usersService.find(payload);

    if ('status' in user) return user;

    return user;
  }

  @MessagePattern(UserContract.UpdateCommand.Pattern)
  public async update(
    @Payload() payload: UserContract.UpdateCommand.Payload,
  ): Promise<UserContract.UpdateCommand.Response | SendErrorUtil> {
    const user: Entity | SendErrorUtil = await this.usersService.update(payload);

    if ('status' in user) return user;

    return user;
  }

  @MessagePattern(UserContract.GetUsersQuery.Pattern)
  public async get(
    @Payload() payload?: UserContract.GetUsersQuery.Payload,
  ): Promise<UserContract.GetUserQuery.Response[] | SendErrorUtil> {
    const user: Entity[] | SendErrorUtil = await this.usersService.get(payload);

    if ('status' in user) return user;

    return user;
  }

  @MessagePattern(AuthContract.AuthQuery.Pattern)
  public async auth(
    @Payload() payload?: AuthContract.AuthQuery.Payload,
  ): Promise<AuthContract.AuthQuery.Response | SendErrorUtil> {
    const user: Entity | SendErrorUtil = await this.usersService.auth(payload);

    if ('status' in user) return user;

    return user;
  }
}
