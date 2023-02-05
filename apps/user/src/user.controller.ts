import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, NatsContext, Payload } from '@nestjs/microservices';

import { SendErrorUtil } from '@common/utils';
import { IUser } from '@common/interface';
import { AuthContract, UserContract } from '@common/contracts';

import { IUserController } from './types';
import { UserService } from './user.service';
import { Entity } from './user.entity';

@Controller()
export class UserController implements IUserController {
  constructor(private readonly usersService: UserService) {}

  @MessagePattern(UserContract.CreateCommand.Pattern)
  public async create(
    @Payload() payload: UserContract.CreateCommand.Request,
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
    @Payload() payload: UserContract.GetUserQuery.Request,
  ): Promise<UserContract.GetUserQuery.Response | SendErrorUtil> {
    const user: Entity | SendErrorUtil = await this.usersService.find(payload);

    if ('status' in user) return user;

    return user;
  }

  @MessagePattern(UserContract.GetUsersQuery.Pattern)
  public async get(
    @Payload() payload?: UserContract.GetUsersQuery.Request,
  ): Promise<UserContract.GetUserQuery.Response[] | SendErrorUtil> {
    const user: Entity[] | SendErrorUtil = await this.usersService.get(payload);

    if ('status' in user) return user;

    return user;
  }

  @MessagePattern(AuthContract.AuthQuery.Pattern)
  public async auth(
    @Payload() payload?: AuthContract.AuthQuery.Request,
  ): Promise<AuthContract.AuthQuery.Response | SendErrorUtil> {
    const user: Entity | SendErrorUtil = await this.usersService.auth(payload);

    if ('status' in user) return user;

    return user;
  }

  // @MessagePattern({ cmd: 'user.getUserById' })
  // public getUserById(@Payload() data: any): User {
  //   return this.usersService.getUserById(data);
  // }

  // @MessagePattern({ cmd: 'user.usersList' })
  // public getUsers(): User[] {
  //   return this.usersService.getUsers();
  // }

  // @MessagePattern({ cmd: 'user.updateUser' })
  // public updateUser(@Payload() data: any): User {
  //   return this.usersService.createUser(data);
  // }

  // @MessagePattern({ cmd: 'user.deleteUser' })
  // public deleteUser(@Payload() data: any): User {
  //   return this.usersService.createUser(data);
  // }
  @MessagePattern('user.*')
  public createUser1(@Payload() data: IUser, @Ctx() context: NatsContext) {
    console.dir({ data, context });
    console.dir('1===>');
    console.dir(context.getSubject());
    console.dir(context.getHeaders());
    return this.usersService.create(data);
  }
}
