import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtAccessStrategy, JwtRefreshStrategy, GqlStrategy } from './strategy';
import { JwtUtil } from './jwt';
import { InjectJwtService, JwtStrategyEnv, JwtStrategyName } from './enum';

/*** Refresh jwt service*/
export const JwtRefreshService = () => {
  return {
    imports: [ConfigModule],
    inject: [ConfigService],
    provide: InjectJwtService.Refresh,
    useFactory: (configService: ConfigService): JwtService => {
      return new JwtService({
        secret: configService.get(JwtStrategyEnv.REFRESH_SECRET) || JwtStrategyEnv.REFRESH_SECRET,
        signOptions: {
          audience: configService.get(JwtStrategyEnv.REFRESH_AUDIENCE) || JwtStrategyEnv.REFRESH_AUDIENCE,
          issuer: configService.get(JwtStrategyEnv.REFRESH_ISSUER) || JwtStrategyEnv.REFRESH_ISSUER,
          expiresIn: configService.get(JwtStrategyEnv.REFRESH_EXPIRES) || '2d',
          algorithm: configService.get(JwtStrategyEnv.ALGORITHM) || 'HS256',
        },
      });
    },
  };
};

/*** Access jwt service*/
export const JwtAccessService = () => {
  return {
    imports: [ConfigModule],
    inject: [ConfigService],
    provide: InjectJwtService.Access,
    useFactory: (configService: ConfigService): JwtService => {
      return new JwtService({
        secret: configService.get(JwtStrategyEnv.ACCESS_SECRET) || JwtStrategyEnv.ACCESS_SECRET,
        signOptions: {
          audience: configService.get(JwtStrategyEnv.ACCESS_AUDIENCE) || JwtStrategyEnv.ACCESS_AUDIENCE,
          issuer: configService.get(JwtStrategyEnv.ACCESS_ISSUER) || JwtStrategyEnv.ACCESS_ISSUER,
          expiresIn: configService.get(JwtStrategyEnv.ACCESS_EXPIRES) || '1h',
          algorithm: configService.get(JwtStrategyEnv.ALGORITHM) || 'HS256',
        },
      });
    },
  };
};

/*** Default jwt service */
export const JwtModuleRootAsync = (): DynamicModule => {
  return JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => ({
      secret: configService.get(JwtStrategyEnv.SECRET) || JwtStrategyEnv.SECRET,
      signOptions: {
        audience: configService.get(JwtStrategyEnv.AUDIENCE) || JwtStrategyEnv.AUDIENCE,
        issuer: configService.get(JwtStrategyEnv.ISSUER) || JwtStrategyEnv.ISSUER,
        expiresIn: configService.get(JwtStrategyEnv.EXPIRES) || '2y',
        algorithm: configService.get(JwtStrategyEnv.ALGORITHM) || 'HS256',
      },
    }),
  });
};

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: JwtStrategyName.Gql,
      session: true,
    }),
    JwtModuleRootAsync(),
  ],
  providers: [GqlStrategy, JwtRefreshStrategy, JwtAccessStrategy, JwtUtil, JwtRefreshService(), JwtAccessService()],
  exports: [GqlStrategy, JwtRefreshStrategy, JwtAccessStrategy, JwtUtil],
})
export class JwtUtilModule {}
