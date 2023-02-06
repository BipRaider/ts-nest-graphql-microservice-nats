import { type Algorithm } from 'jsonwebtoken';
declare namespace NodeJS {
  interface ProcessEnv {
    //JWT
    readonly JWT_ALGORITHM: Algorithm;
    readonly JWT_PRIVATE_KEY: string;
    readonly JWT_PUBLIC_KEY: string;
    // JWT default
    readonly JWT_SECRET: string;
    readonly JWT_ISSUER: string;
    readonly JWT_AUDIENCE: string;
    readonly JWT_EXPIRES: string;
    //JWT  access
    readonly JWT_ACCESS_SECRET: string;
    readonly JWT_ACCESS_AUDIENCE: string;
    readonly JWT_ACCESS_ISSUER: string;
    readonly JWT_ACCESS_EXPIRES: string;
    //JWT  refresh
    readonly JWT_REFRESH_SECRET: string;
    readonly JWT_REFRESH_AUDIENCE: string;
    readonly JWT_REFRESH_ISSUER: string;
    readonly JWT_REFRESH_EXPIRES: string;
  }
}
