export enum JwtStrategyName {
  Refresh = 'jwt-refresh',
  Access = 'jwt-access',
  Gql = 'jwt-gql',
}

export enum InjectJwtService {
  Refresh = 'JwtRefreshService',
  Access = 'JwtAccessService',
}

export enum JwtStrategyEnv {
  SECRET = 'JWT_SECRET',
  ISSUER = 'JWT_ISSUER',
  AUDIENCE = 'JWT_AUDIENCE',
  EXPIRES = 'JWT_EXPIRES',
  ALGORITHM = 'JWT_ALGORITHM',

  ACCESS_SECRET = 'JWT_ACCESS_SECRET',
  ACCESS_AUDIENCE = 'JWT_ACCESS_AUDIENCE',
  ACCESS_ISSUER = 'JWT_ACCESS_ISSUER',
  ACCESS_EXPIRES = 'JWT_ACCESS_EXPIRES',

  REFRESH_SECRET = 'JWT_REFRESH_SECRET',
  REFRESH_AUDIENCE = 'JWT_REFRESH_AUDIENCE',
  REFRESH_ISSUER = 'JWT_REFRESH_ISSUER',
  REFRESH_EXPIRES = 'JWT_REFRESH_EXPIRES',
}
