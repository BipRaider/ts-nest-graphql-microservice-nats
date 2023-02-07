import { Inject, Injectable } from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';

import { ErrorUtil, PasswordUtil, SendErrorUtil } from '@common/utils';
import { UserContract } from '@common/contracts';
import { ENUM } from '@common/interface';

import { CreateUserInput } from './dto/input/create-user.input';
import { GetUserInput } from './dto/input/get-user.input';
import { GetUsersInput } from './dto/input/get-users.input';

@Injectable()
export class UsersService {
  constructor(
    @Inject(ENUM.NatsServicesName.USER) private readonly userClient: ClientNats,
    private readonly passwordUtils: PasswordUtil,
  ) {}

  public create = async (
    data: CreateUserInput,
  ): Promise<UserContract.CreateCommand.Response | SendErrorUtil> => {
    const password = await this.passwordUtils.hash({ password: data.password });

    const record = UserContract.CreateCommand.build({ ...data, password });

    const user: UserContract.CreateCommand.Response | SendErrorUtil = await new Promise(
      async res => {
        const response = this.userClient.send<
          UserContract.CreateCommand.Response,
          UserContract.CreateCommand.UserRecord
        >(UserContract.CreateCommand.Pattern, record);

        response.subscribe({
          next: async data => res(data),
          error: err => res(new ErrorUtil(502).send({ error: err.message, payload: err })),
        });
      },
    );

    return user;
  };

  public find = async (
    data: GetUserInput,
  ): Promise<UserContract.GetUserQuery.Response | SendErrorUtil> => {
    const record = UserContract.GetUserQuery.build(data);

    const user: UserContract.GetUserQuery.Response | SendErrorUtil = await new Promise(
      async res => {
        const response = this.userClient.send<
          UserContract.GetUserQuery.Response,
          UserContract.GetUserQuery.UserRecord
        >(UserContract.GetUserQuery.Pattern, record);

        response.subscribe({
          next: async data => res(data),
          error: err => res(new ErrorUtil(502).send({ error: err.message, payload: err })),
        });
      },
    );

    return user;
  };

  public get = async (
    data: GetUsersInput,
  ): Promise<UserContract.GetUsersQuery.Response[] | SendErrorUtil> => {
    const record = UserContract.GetUsersQuery.build(data);

    const user: UserContract.GetUsersQuery.Response[] | SendErrorUtil = await new Promise(
      async res => {
        const response = this.userClient.send<
          UserContract.GetUsersQuery.Response[],
          UserContract.GetUsersQuery.UserRecord
        >(UserContract.GetUsersQuery.Pattern, record);

        response.subscribe({
          next: async data => res(data),
          error: err => res(new ErrorUtil(502).send({ error: err.message, payload: err })),
        });
      },
    );

    return user;
  };
  // public getUserById(data: GetUserById): Observable<User> {
  //   return this.userClient.send({ cmd: 'user.getUserById' }, data);
  // }

  // public getUsers(): Observable<User[]> {
  //   return this.userClient.send({ cmd: 'user.usersList' }, {});
  // }

  // public updateUser(data: UpdateUserInput): Observable<User> {
  //   return this.userClient.send({ cmd: 'user.updateUser' }, data);
  // }

  // public deleteUser(data: DeleteUserInput): Observable<User> {
  //   return this.userClient.send({ cmd: 'user.deleteUser' }, { data });
  // }

  // public getUserByEmail = async (data): Promise<Observable<User>> => {
  //   const headers = nats.headers();
  //   headers.set('x-version', '1.0.1');
  //   const record = new NatsRecordBuilder(data).setHeaders(headers).build();
  //   return this.userClient.send('user.getUserByEmail', record);
  // };
}
