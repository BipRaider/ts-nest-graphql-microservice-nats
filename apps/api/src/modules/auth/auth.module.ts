import { Module } from '@nestjs/common';

import { NatsModule } from '@common/libs';
import { JwtStrategyModule, PasswordModule } from '@common/utils';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';
import { GuardsModule } from '../../guards/guards.module';
import { jwtGqlOptions, jwtRefreshOptions } from '../../auth.constants';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PasswordModule,
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
    GuardsModule,
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
