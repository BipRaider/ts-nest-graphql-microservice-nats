import { Injectable } from '@nestjs/common';

import { ErrorUtil, PasswordUtil, SendErrorUtil } from '@common/utils';
import { UserContract, AuthContract } from '@common/contracts';

import { IUserService } from './types';
import { UsersRepository } from './user.repository';
import { Entity } from './user.entity';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly passwordUtils: PasswordUtil,
  ) {}

  async create(dto: UserContract.CreateCommand.Request): Promise<Entity | SendErrorUtil> {
    try {
      const entity = new Entity(dto);
      if (!entity.email)
        return new ErrorUtil(400).send({
          error: 'Email not found.',
          payload: { email: entity.email },
        });

      const existed = await this.repository.find(entity);
      if (existed)
        return new ErrorUtil(422).send({
          error: 'User existed.',
          payload: { email: entity.email },
        });

      const user = await this.repository.create(entity);

      return new Entity(user);
    } catch (error) {
      return new ErrorUtil(502).send({
        error: 'UserService.create something wrong.',
        payload: error,
      });
    }
  }

  async find(dto: UserContract.GetUserQuery.Request): Promise<Entity | SendErrorUtil> {
    try {
      const entity = new Entity(dto);
      const user = await this.repository.find(entity);
      if (!user)
        return new ErrorUtil(404).send({
          error: 'User not found.',
          payload: { email: entity.email, id: entity.id },
        });

      return new Entity(user);
    } catch (error) {
      return new ErrorUtil(502).send({
        error: 'UserService.find something wrong.',
        payload: error,
      });
    }
  }

  async get(dto?: UserContract.GetUsersQuery.Request): Promise<Entity[] | SendErrorUtil> {
    try {
      const entity = new Entity({}).filter(dto);
      const users = await this.repository.get(entity);

      return users.map(user => new Entity(user));
    } catch (error) {
      return new ErrorUtil(502).send({
        error: 'UserService.find something wrong.',
        payload: error,
      });
    }
  }

  public auth = async (dto: AuthContract.AuthQuery.Request): Promise<Entity | SendErrorUtil> => {
    const entity = new Entity(dto);
    const user = await this.repository.auth(entity);

    if (!user)
      return new ErrorUtil(401).send({
        error: 'Error authorization',
        payload: { err: 'Password or email is incorrect' },
      });

    const isSame: boolean = await this.passwordUtils.compare({
      hashed: user.password,
      password: entity.password,
    });

    if (!isSame)
      return new ErrorUtil(401).send({
        error: 'Error authorization',
        payload: { err: 'Password or email is incorrect' },
      });

    user.password = null;

    return new Entity(user);
  };
}
