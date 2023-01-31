import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { Strategy, ExtractJwt } from 'passport-jwt';

import { UsersService } from '../../users/users.service';
import { Auth } from '../dto/auth.model';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly usersService: UsersService) {
    super({
      secretOrKey: 'JWT_REFRESHTOKEN_SECRET',
      issuer: 'JWT_ISSUER',
      audience: 'JWT_AUDIENCE',
      jwtFromRequest: ExtractJwt.fromExtractors([
        req => {
          return req.get('cookies.refresh-token');
        },
      ]),
    });
  }

  async validate(data: any): Promise<Auth> {
    // const user: User = await new Promise(async res => {
    //   this.usersService.getUserByEmail({ email: data.email }).subscribe(async data => res(data));
    // });

    return data;
  }
}
