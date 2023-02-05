import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import get from 'lodash.get';

import { IJwtValidateToken } from '@common/interface';
import { JwtStrategyName } from '../enum';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, JwtStrategyName.Refresh) {
  constructor(private readonly configService: ConfigService) {
    super({
      secretOrKey: configService.get('JWT_REFRESH_SECRET') || 'JWT_REFRESH_SECRET',
      audience: configService.get('JWT_REFRESH_AUDIENCE') || 'JWT_REFRESH_AUDIENCE',
      issuer: configService.get('JWT_REFRESH_ISSUER') || 'JWT_REFRESH_ISSUER',
      expiresIn: configService.get('JWT_REFRESH_EXPIRES') || '2d',
      passReqToCallback: true, //Return Request to the validate func.
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: any) => {
          let token: string = null;
          if (!token) token = get(req, 'cookies.refresh-token', null);
          if (!token) token = get(req, 'session.authTokens.refresh-token', null);
          if (!token) token = get(req, 'headers.refresh', null);

          if (token && typeof token === 'string') return token.split(' ')[1];
          return '';
        },
      ]),
    });
  }

  async validate(_req: any, user: IJwtValidateToken, _fn: any): Promise<IJwtValidateToken> {
    // console.log('JwtRefreshStrategy--2-req.headers -->', req.headers);
    // console.log('JwtRefreshStrategy--2-req.session -->', req.session);
    // console.log('JwtRefreshStrategy--2-user-->', user );
    return user;
  }
}
