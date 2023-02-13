import { NatsRecord, NatsRecordBuilder } from '@nestjs/microservices';
import { ObjectId } from 'mongoose';

import { IBaseData, IPrivateData, IUser, ENUM } from '@common/interface';

/*** Command for: `updating a user`.
 ** And based on this,the connection of servers is built.
 */
export namespace UpdateCommand {
  /*** The connection to the service `one to one`.*/
  export const Pattern: {
    readonly cmd: string;
  } = {
    cmd: `${ENUM.NatsServicesQueue.USER}.update`,
  };

  /*** These values must be:
   **  It is a bridge between a `Client app` and a an `API service`.
   **  For update of `the user`.
   */
  export class Request
    implements Partial<Pick<IUser, 'name' | 'avatar' | 'privateData' | 'password'>>
  {
    name?: string;
    password?: string;
    privateData?: IPrivateData;
    avatar?: string;
  }

  /*** These values must be:
   **  It is a bridge between an `API service` and a `User service`.
   **  For update of `the user` in database.
   */
  export class Payload extends Request implements Pick<IBaseData, 'id'> {
    id: ObjectId;
  }

  /*** These values must be returned from the service after the products has been found.*/
  export class Response
    implements
      Required<
        IBaseData &
          Omit<
            IUser,
            'password' | 'active' | 'githubId' | 'redditId' | 'googleId' | 'tokens' | 'roles'
          >
      >
  {
    created: Date;
    updated: Date;
    name: string;
    email: string;
    privateData: IPrivateData;
    avatar: string;
    id: ObjectId;
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
