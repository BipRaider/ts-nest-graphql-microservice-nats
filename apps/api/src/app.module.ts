import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PassportModule } from '@nestjs/passport';

import { JwtUtilModule, JwtStrategyName } from '@common/utils';
import { RedisModule } from '@common/libs';

import { GraphQLOptionsHost } from './graphql/graphql.option';
import { ScalarModule } from './graphql/scalar/scalar.module';
import { AuthMiddleware } from './modules/auth/auth.middleware';
import { ListModules } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [] }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GraphQLOptionsHost,
    }),
    PassportModule.register({
      defaultStrategy: JwtStrategyName.Gql,
      session: true,
    }),
    RedisModule,
    ScalarModule,
    JwtUtilModule,
    ...ListModules,
  ],
  providers: [JwtUtilModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
