import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategyName } from '../enum';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, JwtStrategyName.Access) {
  constructor(private readonly configService: ConfigService) {
    super({
      secretOrKey: configService.get('JWT_ACCESS_SECRET') || 'JWT_ACCESS_SECRET',
      audience: configService.get('JWT_ACCESS_AUDIENCE') || 'JWT_ACCESS_AUDIENCE',
      issuer: configService.get('JWT_ACCESS_ISSUER') || 'JWT_ACCESS_ISSUER',
      expiresIn: configService.get('JWT_ACCESS_EXPIRES') || '1h',
      algorithm: 'HS256',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(data: any): Promise<any> {
    console.log('JwtAccessStrategy--2-step-->');
    return data;
  }
}
