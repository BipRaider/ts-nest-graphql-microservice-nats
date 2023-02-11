import dotenv from 'dotenv';
import { type Algorithm } from 'jsonwebtoken';

import { IEnvConfig, ENUM } from '@common/interface';

export const envConfig = (): IEnvConfig => {
  dotenv.config();
  const defPort = 3001;
  return {
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    port: Number(process.env.PORT),
    defPort,
    server: {
      port: Number(process.env['SERVER_PORT'] || defPort),
      name: process.env['SERVER_NAME'],
      host: process.env['SERVER_HOST'],
      url: process.env['SERVER_URL'],
      clientUrl: process.env['CLIENT_URL'],
      apiProt: process.env['API_PORT'],
    },
    mongodb: {
      url: process.env['MONGO_URL'],
      host: process.env['MONGO_HOST'],
      port: process.env['MONGO_PORT'],
      login: process.env['MONGO_LOGIN'],
      database: process.env['MONGO_DATABASE'],
      password: process.env['MONGO_PASSWORD'],
      auth: process.env['MONGO_AUTH'],
    },
    nats: {
      url: process.env['NATS_URL'],
    },
    redis: {
      host: process.env['REDIS_HOST'],
      port: process.env['REDIS_PORT'],
      password: process.env['REDIS_PASSWORD'],
    },
    jwt: {
      default: {
        secret: process.env[ENUM.JwtStrategyEnv.SECRET] || ENUM.JwtStrategyEnv.SECRET,
        signOptions: {
          audience: process.env[ENUM.JwtStrategyEnv.AUDIENCE] || ENUM.JwtStrategyEnv.AUDIENCE,
          issuer: process.env[ENUM.JwtStrategyEnv.ISSUER] || ENUM.JwtStrategyEnv.ISSUER,
          expiresIn: process.env[ENUM.JwtStrategyEnv.EXPIRES] || '2y',
          algorithm: (process.env[ENUM.JwtStrategyEnv.ALGORITHM] as Algorithm) || 'HS256',
        },
      },
      access: {
        secret: process.env[ENUM.JwtStrategyEnv.ACCESS_SECRET] || ENUM.JwtStrategyEnv.ACCESS_SECRET,
        signOptions: {
          audience:
            process.env[ENUM.JwtStrategyEnv.ACCESS_AUDIENCE] || ENUM.JwtStrategyEnv.ACCESS_AUDIENCE,
          issuer:
            process.env[ENUM.JwtStrategyEnv.ACCESS_ISSUER] || ENUM.JwtStrategyEnv.ACCESS_ISSUER,
          expiresIn: process.env[ENUM.JwtStrategyEnv.ACCESS_EXPIRES] || '1h',
          algorithm: (process.env[ENUM.JwtStrategyEnv.ALGORITHM] as Algorithm) || 'HS256',
        },
      },
      refresh: {
        secret:
          process.env[ENUM.JwtStrategyEnv.REFRESH_SECRET] || ENUM.JwtStrategyEnv.REFRESH_SECRET,
        signOptions: {
          audience:
            process.env[ENUM.JwtStrategyEnv.REFRESH_AUDIENCE] ||
            ENUM.JwtStrategyEnv.REFRESH_AUDIENCE,
          issuer:
            process.env[ENUM.JwtStrategyEnv.REFRESH_ISSUER] || ENUM.JwtStrategyEnv.REFRESH_ISSUER,
          expiresIn: process.env[ENUM.JwtStrategyEnv.REFRESH_EXPIRES] || '2d',
          algorithm: (process.env[ENUM.JwtStrategyEnv.ALGORITHM] as Algorithm) || 'HS256',
        },
      },
    },
    email: {
      host: process.env['EMAIL_HOST'] || '',
      port: process.env['EMAIL_PORT'] || '',
      auth: process.env['EMAIL_AUTH_USER'] || '',
      password: process.env['EMAIL_AUTH_PASSWORD'] || '',
      apiKey: process.env['SENDGRID_API_KEY'] || '',
    },
    session: {
      secret: process.env['SESSION_SECRET'],
    },
    graphql: {
      host: process.env['GRAPHQL_HOST'] || undefined,
      port: process.env['GRAPHQL_PORT'] || undefined,
      url: process.env['GRAPHQL_URL'] || undefined,
      apollo: {
        path: process.env['GRAPHQL_PATH'] || undefined,
        //It's need to getting schema.gql in https://studio.apollographql.com/sandbox/explorer
        //https://www.apollographql.com/blog/graphql/security/why-you-should-disable-graphql-introspection-in-production/
        introspection: process.env['GRAPHQL_INTROSPECTION'] === 'true' || false, // process.env.NODE_ENV !== 'production',
        playground: process.env['GRAPHQL_PLAYGROUND'] === 'true' || false,
        persistedQueries: process.env['GRAPHQL_PERSISTED_QUERIES'] === 'false' ? false : {}, //TODO:
        cache: process.env['GRAPHQL_CACHE'] === 'bounded' ? 'bounded' : 'bounded', //TODO:
        installSubscriptionHandlers: true, // is old
      },
    },
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 10_000, // limit each IP to 100 requests per windowMs
    },
    cors: {
      origin: '*',
      credentials: true,
    },
    order: {
      noRefund: process.env['TIME_NO_REFUND'] || 14 * 24 * 60 * 60,
    },
  };
};
