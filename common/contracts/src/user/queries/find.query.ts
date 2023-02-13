import { NatsRecord, NatsRecordBuilder } from '@nestjs/microservices';

import { ObjectId } from 'mongoose';

import { IBaseData, IPrivateData, IUser, ENUM } from '@common/interface';

/*** Query for search the `user`
 ** And based on this, the connection of servers is built.
 */
export namespace GetUserQuery {
  /*** The connection to the service `one to one`.*/
  export const Pattern: {
    readonly cmd: string;
  } = {
    cmd: `${ENUM.NatsServicesQueue.USER}.find`,
  };

  /*** These values must be:
   **  It is a bridge between a `Client app` and a an `API service`.
   **  For `search` of the user.
   */
  export class Request implements Partial<Pick<IUser, 'email'> & Pick<IBaseData, 'id'>> {
    email?: string;
    id?: ObjectId;
  }

  /*** These values must be:
   **  It is a bridge between an `API service` and a `User service`.
   **  For `search` of the user in database.
   */
  export class Payload extends Request {
    finderId: ObjectId;
  }

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
  export type Record = NatsRecord<Payload, Header>;
}
