import { IBaseData, IPrivateData, IUser, Roles } from '@common/interface';
import { ObjectId } from 'mongoose';
import { NatsRecord, NatsRecordBuilder } from '@nestjs/microservices';

/*** Query for get the `users`.
 ** And based on this, the connection of servers is built.
 */
export namespace GetUsersQuery {
  /*** The connection to the service `one to one`.*/
  export const Pattern: {
    readonly cmd: string;
  } = {
    cmd: 'user.get',
  };

  /*** Must be one of these values to get for  users.*/
  export class Request {
    skip?: number;
    limit?: number;
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
