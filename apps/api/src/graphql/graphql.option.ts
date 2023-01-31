import { join } from 'path';
import { Injectable, Logger } from '@nestjs/common';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

import { ErrorUtil } from '@common/utils';

import { clearPassword } from './graphql.middleware';

const logger = new Logger('Apollo');

@Injectable()
export class GraphQLOptionsHost implements GqlOptionsFactory {
  async createGqlOptions(): Promise<ApolloDriverConfig> {
    return {
      installSubscriptionHandlers: true, // is old
      // playground: true,
      playground: false,
      //https://www.apollographql.com/docs/apollo-server/api/plugin/landing-pages/
      plugins: [ApolloServerPluginLandingPageLocalDefault()],

      autoSchemaFile: join(process.cwd(), './schema.gql'),
      typePaths: [join(process.cwd(), './schema.gql')],
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
      context: async ({ req, res }: { req: Request & { headers: { authorization: string } }; res: Response }) => {
        logger.log('context');
        return { req, res };
      },
      formatResponse: res => {
        logger.log('formatResponse');

        return res;
      },
      formatError: (err: GraphQLError): GraphQLError => {
        logger.error(err);
        return new ErrorUtil().sendClient(err);
      },
    };
  }
}