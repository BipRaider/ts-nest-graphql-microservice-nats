import { NatsRecord, NatsRecordBuilder } from '@nestjs/microservices';
import { ObjectId } from 'mongoose';

import { IBaseData, IProduct, ENUM } from '@common/interface';

/*** Command for: `creating a product`.
 ** And based on this,the connection of servers is built.
 */
export namespace CreateCommand {
  /*** The connection to the service `one to one`.*/
  export const Pattern: {
    readonly cmd: string;
  } = {
    cmd: `${ENUM.NatsServicesQueue.PRODUCT}.create`,
  };

  /*** These values must be:
   **  It is a bridge between a `Client app` and a an `API service`.
   **  For `create` of the product.
   */
  export class Request implements Partial<Omit<IProduct, 'IsRemove' | 'userId'>> {
    storeId: ObjectId;
    price?: number;
    amount?: number;
    description?: string;
    discount?: number;
    name: string;
  }

  /*** These values must be:
   **  It is a bridge between an `API service` and a `Product service`.
   **  For `create` of the product in database.
   */
  export class Payload implements Partial<Omit<IProduct, 'IsRemove'>> {
    userId: ObjectId;
    storeId: ObjectId;
    price?: number;
    amount?: number;
    description?: string;
    discount?: number;
    name: string;
  }

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
