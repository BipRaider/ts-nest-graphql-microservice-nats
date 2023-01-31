import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { UsersModule } from './modules/users/users.module';
import { ProductModule } from './modules/product/product.module';
import { AuthModule } from './modules/auth/auth.module';

import { GraphQLOptionsHost } from './graphql/graphql.option';
import { ScalarModule } from './graphql/scalar/scalar.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GraphQLOptionsHost,
    }),
    ScalarModule,
    UsersModule,
    ProductModule,
    AuthModule,
  ],
})
export class AppModule {}
