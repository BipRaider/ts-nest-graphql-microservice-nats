import { NatsRecord, NatsRecordBuilder } from '@nestjs/microservices';

import { ObjectId } from 'mongoose';

import { IBaseData, IPrivateData, IUser, ENUM } from '@common/interface';

/*** Query for search the `user`
 ** And based on this, the connection of servers is built.
 */
export namespace AuthQuery {
  /*** The connection to the service `one to one`.*/
  export const Pattern: {
    readonly cmd: string;
  } = {
    cmd: 'user.auth',
  };

  /*** These values must be:
   **  It is a bridge between an `API service` and a `User service`.
   **  For `search` of the user.
   */
  export class Request implements Pick<IUser, 'email' | 'password'> {
    password: string;
    email: string;
  }

  /*** These values must be:
   **  It is a bridge between an `API service` and a `User service`.
   **  For `search` of the user in database.
   */
  export class Payload extends Request {}

  /*** These values must be returned from the service after the user has been found.*/
  export class Response implements Required<IBaseData & Omit<IUser, 'password'>> {
    tokens: string;
    active: boolean;
    githubId: string;
    redditId: string;
    googleId: string;
    avatar: string;
    name: string;
    email: string;
    privateData: IPrivateData;
    roles: ENUM.Roles[];
    id: ObjectId;
    created: Date;
    updated: Date;
  }

  /*** Configuration, nats header*/
  export class Header {}

  /*** Build a request to submit it to the service for processing.*/
  export const build = (data: Payload): NatsRecord<Payload, Header> => {
    return new NatsRecordBuilder<Payload>(data).build();
  };

  /*** The data types to be sent to the service.*/
  export type UserRecord = NatsRecord<Payload, Header>;
}
