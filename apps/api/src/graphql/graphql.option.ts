import { join } from 'path';
import { Injectable, Logger, Inject } from '@nestjs/common';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { PUB_SUB } from '@common/libs';
import { ErrorUtil, JwtUtil } from '@common/utils';
import { envConfig } from '@common/config';
import { IJwtGenerateToken } from '@common/interface';

import { clearPassword } from './graphql.middleware';

@Injectable()
export class GraphQLOptionsHost implements GqlOptionsFactory {
  constructor(private readonly jwt: JwtUtil, @Inject(PUB_SUB) private pubSub: RedisPubSub) {}
  async createGqlOptions(): Promise<ApolloDriverConfig> {
    const { graphql } = envConfig();
    const { apollo } = graphql;

    return {
      ...graphql.apollo,
      //https://www.apollographql.com/docs/apollo-server/api/plugin/landing-pages/
      plugins: apollo.playground ? [] : [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(process.cwd(), './schema.gql'),
      typePaths: [join(process.cwd(), './schema.gql'), join(process.cwd(), './**/*.gql')],

      subscriptions: {
        'graphql-ws': {
          path: '/graphql',

          onConnect: async context => {
            const { extra, connectionParams, connectionInitReceived } = context as {
              extra: any;
              connectionParams: any;
              connectionInitReceived: any;
            };
            if (extra && connectionInitReceived) {
              let user: IJwtGenerateToken = null;
              if (connectionParams?.Authorization) {
                const token = String(connectionParams.Authorization).split(' ')[1];
                const expect = await this.jwt.verifyAccess(token);
                if (expect) {
                  const { id, roles, email } = expect;
                  user = { id, roles, email };
                }
              }
              extra.user = user;
              extra.pubSub = this.pubSub;
            }
          },
        },
      },

      resolverValidationOptions: {
        requireResolversForResolveType: 'warn',
      },
      definitions: {
        path: join(process.cwd(), './graphql.interface.ts'),
        defaultScalarType: 'unknown',
        customScalarTypeMapping: {
          DateTime: 'Date',
          ObjectId: 'ObjectId',
        },
      },
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
        numberScalarMode: 'integer',
        fieldMiddleware: [clearPassword],
      },
      cors: {
        origin: '*',
        credentials: true,
      },
      context: async ({
        req,
        res,
        extra,
        connectionParams,
        connectionInitReceived,
        subscriptions,
      }) => {
        // Http request

        return {
          token: undefined as string | undefined,
          req: req as Request,
          res,
          extra,
          connectionParams,
          connectionInitReceived,
          subscriptions,
          pubSub: this.pubSub,
        };
      },
      // formatResponse: (response: GraphQLResponse, _requestContext: GraphQLRequestContext<object>): GraphQLResponse => {
      //   logger.log('formatResponse');
      //   return response;
      // },
      formatError: (err: GraphQLError): GraphQLError => {
        const logger = new Logger('Apollo');
        delete err.stack;
        logger.error(err);
        return new ErrorUtil().sendClient(err);
      },
    };
  }
}
