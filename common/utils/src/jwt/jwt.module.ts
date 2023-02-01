import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { jwtGqlOptions, jwtRefreshOptions, passportOptions } from './constants';
import { JwtRefreshStrategy } from './strategy/refresh.strategy';
import { GqlStrategy } from './strategy/gql.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PassportModule.register(passportOptions)],
  exports: [
    {
      provide: 'JwtRefreshTokenService',
      useFactory: (): JwtService => {
        return new JwtService(jwtRefreshOptions);
      },
    },
    GqlStrategy,
    JwtRefreshStrategy,
  ],
  providers: [
    GqlStrategy,
    JwtRefreshStrategy,
    {
      provide: 'JwtRefreshTokenService',
      useFactory: (): JwtService => {
        return new JwtService(jwtRefreshOptions);
      },
    },
  ],
})
export class JwtStrategyModule {}
