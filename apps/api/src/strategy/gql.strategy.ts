import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GqlStrategy extends PassportStrategy(Strategy, 'jwt-gql') {
  constructor(private configService: ConfigService) {
    super({
      secretOrKey: configService.get('JWT_SECRET') || 'JWT_SECRET',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: any, done: any): Promise<any> {
    console.log('GqlStrategy', payload);
    done(null, payload);
    return payload;
  }
}
