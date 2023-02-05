import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { JwtStrategyName } from '../enum';
import { IJwtValidateToken } from '@common/interface';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, JwtStrategyName.Access) {
  constructor(private readonly configService: ConfigService) {
    super({
      secretOrKey: configService.get('JWT_ACCESS_SECRET') || 'JWT_ACCESS_SECRET',
      audience: configService.get('JWT_ACCESS_AUDIENCE') || 'JWT_ACCESS_AUDIENCE',
      issuer: configService.get('JWT_ACCESS_ISSUER') || 'JWT_ACCESS_ISSUER',
      expiresIn: configService.get('JWT_ACCESS_EXPIRES') || '1h',

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(data: IJwtValidateToken): Promise<IJwtValidateToken> {
    return data;
  }
}
