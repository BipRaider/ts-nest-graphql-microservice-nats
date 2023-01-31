import { Injectable, Inject } from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';

import { AuthContract } from '@common/contracts';
import { ErrorUtil, SendErrorUtil } from '@common/utils';
import { LoginUserInput } from './dto/input/login.input';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientNats,
    @Inject('JwtRefreshTokenService') private readonly refreshTokenService: JwtService,
    private readonly jwtService: JwtService,
  ) {}

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

  async generateRefreshToken(user: AuthContract.AuthQuery.Response): Promise<string> {
    return this.refreshTokenService.sign(
      {
        user: user.email,
      },
      {
        subject: String(user.id),
      },
    );
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verify(payload) {
    return this.jwtService.verify(payload);
  }
}
