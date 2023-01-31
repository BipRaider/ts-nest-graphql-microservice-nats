import { IBaseData, IPrivateData, IUser, Roles } from '@common/interface';
import { ObjectId } from 'mongoose';
import { NatsRecord, NatsRecordBuilder } from '@nestjs/microservices';

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

  /*** Must be `email` to search for a user.*/
  export class Request implements Pick<IUser, 'email' | 'password'> {
    password: string;
    email: string;
  }

  /*** These values must be returned from the service after the user has been found.*/
  export class Response implements Required<IBaseData & Omit<IUser, 'password'>> {
    name: string;
    email: string;
    privateData: IPrivateData;
    roles: Roles[];
    id: ObjectId;
    created: Date;
    updated: Date;
  }

  /*** Configuration, nats header*/
  export class Header {}

  /*** Build a request to submit it to the service for processing.*/
  export const build = (data: Request): NatsRecord<Request, Header> => {
    return new NatsRecordBuilder<Request>(data).build();
  };

  /*** The data types to be sent to the service.*/
  export type UserRecord = NatsRecord<Request, Header>;
}
