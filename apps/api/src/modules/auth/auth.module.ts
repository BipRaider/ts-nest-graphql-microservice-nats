import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { NatsModule } from '@common/libs';
import { PasswordModule } from '@common/utils';

import { AuthService } from './auth.service';
import { JwtRefreshStrategy } from './strategy/refresh.strategy';
import { jwtRefreshOptions, passportOptions, jwtGqlOptions } from './auth.constants';
import { GqlStrategy } from './strategy/gql.strategy';
import { AuthResolver } from './auth.resolver';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    PasswordModule, //Pass util
    PassportModule.register(passportOptions),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET') || 'JWT_SECRET',
        signOptions: { ...jwtGqlOptions.signOptions },
      }),
    }),
    NatsModule([
      {
        name: 'USER_SERVICE',
        queue: 'user',
      },
    ]),
  ],
  providers: [
    AuthResolver,
    AuthService,
    GqlAuthGuard,
    RolesGuard,
    GqlStrategy,
    JwtRefreshStrategy,
    {
      provide: 'JwtRefreshTokenService',
      useFactory: (): JwtService => {
        return new JwtService(jwtRefreshOptions);
      },
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
