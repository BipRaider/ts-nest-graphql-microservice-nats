import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import get from 'lodash.get';

import { JwtStrategyName } from '../enum';
import { IJwtValidateToken } from '@common/interface';

@Injectable()
export class GqlStrategy extends PassportStrategy(Strategy, JwtStrategyName.Gql) {
  constructor(private configService: ConfigService) {
    super({
      secretOrKey: configService.get('JWT_ACCESS_SECRET') || 'JWT_ACCESS_SECRET',
      audience: configService.get('JWT_ACCESS_AUDIENCE') || 'JWT_ACCESS_AUDIENCE',
      issuer: configService.get('JWT_ACCESS_ISSUER') || 'JWT_ACCESS_ISSUER',
      expiresIn: configService.get('JWT_ACCESS_EXPIRES') || '2y',
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: any) => {
          let token: string = null;
          if (!token) token = get(req, 'connectionParams.Authorization', null);

          if (token && typeof token === 'string') return token.split(' ')[1];
          return '';
        },
      ]),
    });
  }

  async validate(req: any, user: IJwtValidateToken, fn: any): Promise<any> {
    fn(null, user);
    return user;
  }
}
