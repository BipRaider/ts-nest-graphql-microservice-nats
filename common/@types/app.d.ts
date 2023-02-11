declare namespace NodeJS {
  interface ProcessEnv {
    /*** The api port like `8080`.*/
    readonly API_PORT: string;
    /*** The name microservice like `api` or `user`. */
    readonly SERVER_NAME: string;
    /*** The server host like `http://localhost`.*/
    readonly SERVER_HOST: string;
    /*** The server port like `8080`.*/
    readonly SERVER_PORT: string;
    /*** The server url like `http://localhost:8080/`.*/
    readonly SERVER_URL: string;

    //Client
    /*** The client url like `http://localhost:3000/`.*/
    readonly CLIENT_URL: string;

    //Passport
    /*** The salt for session like `somesecretverystrong`.*/
    readonly SESSION_SECRET: string;

    //Cookie
    /*** The salt for cookie like `somesecretverystrong`.*/
    readonly COOKIE_SECRET: string;
    /*** Time when product cannot be refund.*/
    readonly TIME_NO_REFUND: string;
  }
}
