export const passportOptions = {
  defaultStrategy: 'jwt-gql',
  session: true,
};

export const jwtGqlOptions = {
  signOptions: {
    expiresIn: '30h',
  },
};

export const jwtRefreshOptions = {
  secret: 'JWT_REFRESHTOKEN_SECRET',
  signOptions: {
    audience: 'JWT_AUDIENCE',
    issuer: 'JWT_ISSUER',
    expiresIn: '2d',
  },
};

export const strategyName = {
  jwtRefresh: 'jwt-refresh',
  jwtGql: 'jwt-gql',
};
