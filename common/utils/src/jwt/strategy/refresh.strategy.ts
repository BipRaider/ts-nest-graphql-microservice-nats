import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { JwtStrategyName } from '../enum';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, JwtStrategyName.Refresh) {
  constructor(private readonly configService: ConfigService) {
    super({
      secretOrKey: configService.get('JWT_REFRESH_SECRET') || 'JWT_REFRESH_SECRET',
      audience: configService.get('JWT_REFRESH_AUDIENCE') || 'JWT_REFRESH_AUDIENCE',
      issuer: configService.get('JWT_REFRESH_ISSUER') || 'JWT_REFRESH_ISSUER',
      expiresIn: configService.get('JWT_REFRESH_EXPIRES') || '2d',
      algorithm: 'HS256',
      jwtFromRequest: ExtractJwt.fromExtractors([
        req => {
          const token = req.get('cookies.refresh-token');
          if (token && typeof token === 'string') return token;
          return '';
        },
      ]),
    });
  }

  async validate(data: any): Promise<any> {
    console.log('JwtRefreshStrategy--2-step-->', data);
    return data;
  }
}
