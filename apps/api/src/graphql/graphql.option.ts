import { join } from 'path';
import { Injectable, Logger } from '@nestjs/common';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

import { ErrorUtil } from '@common/utils';
import { envConfig } from '@common/config';

import { clearPassword } from './graphql.middleware';

const logger = new Logger('Apollo');

@Injectable()
export class GraphQLOptionsHost implements GqlOptionsFactory {
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
          path: join(process.cwd(), './schema.gql'),
          onConnect: context => {
            console.log('graphql-ws =onConnect=>', context);
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
      context: ({ req, res, connection }) => {
        if (!connection) {
          // Http request
          return {
            token: undefined as string | undefined,
            req: req as Request,
            res,
          };
        } else {
          // USE THIS TO PROVIDE THE RIGHT CONTEXT FOR I18N
          return {
            token: undefined as string | undefined,
            req: connection.context as Request,
            res,
          };
        }
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
