import { NatsRecord, NatsRecordBuilder } from '@nestjs/microservices';

import { ObjectId } from 'mongoose';

import { IBaseData, IPrivateData, IUser, ENUM } from '@common/interface';

/*** Command for: `creating a user`.
 ** And based on this, the connection of servers is built.
 */
export namespace CreateCommand {
  /*** The connection to the service `one to one`.*/
  export const Pattern: {
    readonly cmd: string;
  } = {
    cmd: `${ENUM.NatsServicesQueue.USER}.create`,
  };

  /*** These values must be:
   **  It is a bridge between a `Client app` and a an `API service`.
   **  For create `the user`.
   */
  export class Request
    implements Pick<IUser, 'email' | 'password' | 'name' | 'privateData' | 'roles'>
  {
    email: string;
    password: string;
    name: string;
    privateData?: IPrivateData;
    roles?: ENUM.Roles[];
  }

  /*** These values must be:
   **  It is a bridge between an `API service` and a `User service`.
   **  For create `the user` in database.
   */
  export class Payload extends Request implements IUser {}

  /*** These values must be returned from the service after the user has been created.*/
  export class Response implements IBaseData {
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
