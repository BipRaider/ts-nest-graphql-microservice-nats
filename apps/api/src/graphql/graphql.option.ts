import { join } from 'path';
import { Injectable, Logger } from '@nestjs/common';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { ApolloServerPluginLandingPageLocalDefault, Context } from 'apollo-server-core';

import { ErrorUtil, JwtUtil } from '@common/utils';
import { envConfig } from '@common/config';
import { IJwtGenerateToken } from '@common/interface';

import { clearPassword } from './graphql.middleware';

const logger = new Logger('Apollo');

@Injectable()
export class GraphQLOptionsHost implements GqlOptionsFactory {
  constructor(private readonly jwt: JwtUtil) {}
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
                const token = connectionParams.Authorization.split(' ')[1];
                const { id, roles, email } = await this.jwt.verifyAccess(token);
                user = { id, roles, email };
              }
              extra.user = user;
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
        connection,
        extra,
        connectionParams,
        connectionInitReceived,
      }) => {
        // Http request
        return {
          token: undefined as string | undefined,
          req: req as Request,
          res,
          extra,
          connection,
          connectionParams,
          connectionInitReceived,
        };
      },
      // formatResponse: (response: GraphQLResponse, _requestContext: GraphQLRequestContext<object>): GraphQLResponse => {
      //   logger.log('formatResponse');

      //   return response;
      // },
      formatError: (err: GraphQLError): GraphQLError => {
        logger.error(err);
        delete err.stack;
        return new ErrorUtil().sendClient(err);
      },
    };
  }
}
