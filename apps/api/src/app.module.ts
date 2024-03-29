import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { JwtUtilModule } from '@common/utils';
import { RedisModule, PubSubModule } from '@common/libs';

import { GraphQLOptionsHost } from './graphql/graphql.option';
import { ScalarModule } from './graphql/scalar/scalar.module';
import { AuthMiddleware } from './modules/auth/auth.middleware';
import { ListModules } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [] }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      inject: [JwtUtilModule],
      imports: [JwtUtilModule],
      driver: ApolloDriver,
      useClass: GraphQLOptionsHost,
    }),

    RedisModule,
    PubSubModule,
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
