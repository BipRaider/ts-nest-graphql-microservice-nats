import { Injectable, Inject } from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';

import { AuthContract } from '@common/contracts';
import { ErrorUtil, JwtUtil, SendErrorUtil } from '@common/utils';
import { LoginUserInput } from './dto/input/login.input';

import { IJwtGenerateToken } from '@common/interface';

@Injectable()
export class AuthService {
  constructor(@Inject('USER_SERVICE') private readonly userClient: ClientNats, private readonly jwt: JwtUtil) {}

  public validate = async (data: LoginUserInput): Promise<AuthContract.AuthQuery.Response | SendErrorUtil> => {
    const record = AuthContract.AuthQuery.build(data);

    const response = this.userClient.send<AuthContract.AuthQuery.Response, AuthContract.AuthQuery.UserRecord>(
      AuthContract.AuthQuery.Pattern,
      record,
    );

    const user: AuthContract.AuthQuery.Response | SendErrorUtil = await new Promise(async res => {
      response.subscribe({
        next: async data => res(data),
        error: err => res(new ErrorUtil(502).send({ error: err.message, payload: err })),
      });
    });

    return user;
  };

  /*** The func creates two  tokens `access_token` and `refresh_token`, then return `access_token`.*/
  public generateToken = async (
    { email, roles, id }: IJwtGenerateToken,
    context: any,
  ): Promise<{ access_token: string }> => {
    const user = { email, roles, id };
    await this.jwt.generateRefreshToken(user, context);
    const access_token = await this.jwt.generateAccessToken(user);

    return { access_token };
  };

  public logout = async (context: any): Promise<boolean> => {
    context.res.cookie(this.jwt.refreshTokenName, '', { httpOnly: true, maxAge: 0 });

    context.res.clearCookie('refresh-token');

    return true;
  };
}
