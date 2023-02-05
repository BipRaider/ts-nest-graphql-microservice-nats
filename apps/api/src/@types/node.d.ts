declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly SERVER_PORT: string;
    readonly SITE_URL: string;

    // Email
    readonly SMTP_SERVER: string;
    readonly SMTP_LOGIN: string;
    readonly SMTP_PASSWORD: string;
    readonly SMTP_FROM_NAME: string;
    readonly SMTP_FROM_EMAIL: string;

    // JWT
    readonly JWT_PRIVATE_KEY: string;
    readonly JWT_REFRESH_PRIVATE_KEY: string;
    readonly JWT_PUBLIC_KEY: string;
    readonly JWT_ALGORITHM: string;
    readonly JWT_EXPIRE_TIME: string;
    readonly JWT_EXPIRE_REFRESH_TIME: string;

    // AWS
    readonly AWS_REGION: string;
    readonly AWS_ACCESS_KEY_ID: string;
    readonly AWS_SECRET_ACCESS_KEY: string;
    readonly AWS_PUBLIC_BUCKET_NAME: string;
    readonly AWS_PRIVATE_BUCKET_NAME: string;

    // Graphql
    readonly GRAPHQL_PLAYGROUND: string;

    // Session
    readonly SESSION_SECRET: string;
  }
}
