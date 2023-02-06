declare namespace NodeJS {
  interface ProcessEnv {
    //mongodb
    /*** Full url like `mongodb://mongo:27017`.*/
    readonly MONGO_URL: string;
    /*** Mongodb name like `test`.*/
    readonly MONGO_DATABASE: string;
    /*** The username like `admin`.*/
    readonly MONGO_LOGIN: string;
    /*** The auth name like `admin`.*/
    readonly MONGO_AUTH: string;
    /*** The user password like `admin`.*/
    readonly MONGO_PASSWORD: string;
    /*** Mongodb host like `mongo` or `localhost`.*/
    readonly MONGO_HOST: string;
    /*** Mongodb port like `27017`. */
    readonly MONGO_PORT: string;
  }
}
