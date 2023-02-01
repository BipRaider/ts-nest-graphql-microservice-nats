import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
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

  async validate(data: any): Promise<any> {
    // const user: User = await new Promise(async res => {
    //   this.usersService.getUserByEmail({ email: data.email }).subscribe(async data => res(data));
    // });
    console.log('JwtRefreshStrategy--->');
    return data;
  }
}
