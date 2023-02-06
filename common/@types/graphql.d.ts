declare namespace NodeJS {
  interface ProcessEnv {
    //Graphql
    /*** The port fot graphql like `8080`.*/
    readonly GRAPHQL_PORT: string;
    /*** The host fot graphql like `localhost`.*/
    readonly GRAPHQL_HOST: string;
    /*** The path fot graphql like `/graphql`.*/
    readonly GRAPHQL_PATH: string;
    /*** The url fot graphql like `http://localhost:8080/graphql`.*/
    readonly GRAPHQL_URL: string;
    /*** Enabling the option to graphql a playground. `true` or `false`.*/
    readonly GRAPHQL_PLAYGROUND: string;
    /*** Allow for download the graphql schema to playground. `true` or `false`.*/
    readonly GRAPHQL_INTROSPECTION: string;
    /*** Something option for cache or in order to avoid DDS.*/
    readonly GRAPHQL_PERSISTED_QUERIES: string;
    /*** Something option for cache or in order to avoid DDS.*/
    readonly GRAPHQL_CACHE: 'bounded';
  }
}
