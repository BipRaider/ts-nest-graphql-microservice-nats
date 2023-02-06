import { ApolloDriverConfig } from '@nestjs/apollo';
import { JwtModuleOptions } from '@nestjs/jwt';

export interface IEnvConfig {
  readonly port: number;
  readonly defPort: number;
  readonly isDevelopment: boolean;
  readonly isProduction: boolean;
  readonly session?: ISessionOption;
  readonly graphql?: IEnvGraphQlConfig;
  readonly mongodb: IEnvMongoDBConfig;
  readonly server: IEnvServerConfig;
  readonly nats: IEnvNATSConfig;
  readonly redis: IEnvRedisConfig;
  readonly jwt: IEnvJwtConfig;
  readonly email: IEnvEmailConfig;
}

export interface IEnvGraphQlConfig {
  host: string;
  port: string;
  url: string;
  apollo?: ApolloDriverConfig;
}
export interface ISessionOption {
  secret: string;
}

export interface IEnvJwtConfig {
  default: JwtModuleOptions;
  refresh?: JwtModuleOptions;
  access?: JwtModuleOptions;
}
export interface IEnvNATSConfig {
  url: string;
}
export interface IEnvRedisConfig {
  host: string;
  port?: string;
  password?: string;
}
export interface IEnvEmailConfig {
  host: string;
  port: string;
  auth: string;
  password: string;
  apiKey: string;
}
export interface IEnvServerConfig {
  port: number;
  name: string;
  host?: string;
  url?: string;
  clientUrl?: string;
  apiProt?: string;
}
export interface IEnvMongoDBConfig {
  url: string;
  host?: string;
  port?: string;
  login?: string;
  database?: string;
  password?: string;
  auth?: string;
}
