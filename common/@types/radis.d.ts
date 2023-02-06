declare namespace NodeJS {
  interface ProcessEnv {
    //Redis
    readonly REDIS_HOST: string;
    readonly REDIS_PORT: string;
    readonly REDIS_PASSWORD: string;
  }
}
