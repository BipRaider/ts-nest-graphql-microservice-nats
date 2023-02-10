import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { JwtStrategyName } from '../enum';

@Injectable()
export class GqlStrategy extends PassportStrategy(Strategy, JwtStrategyName.Gql) {
  constructor(private configService: ConfigService) {
    super({
      secretOrKey: configService.get('JWT_ACCESS_SECRET') || 'JWT_ACCESS_SECRET',
      audience: configService.get('JWT_ACCESS_AUDIENCE') || 'JWT_ACCESS_AUDIENCE',
      issuer: configService.get('JWT_ACCESS_ISSUER') || 'JWT_ACCESS_ISSUER',
      expiresIn: configService.get('JWT_ACCESS_EXPIRES') || '2y',

      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any, done: any): Promise<any> {
    // console.log('GqlStrategy--2-step-->');
    done(null, payload);
    return payload;
  }
}
