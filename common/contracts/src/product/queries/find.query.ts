import { NatsRecord, NatsRecordBuilder } from '@nestjs/microservices';
import { ObjectId } from 'mongoose';

import { IBaseData, IProduct, ENUM } from '@common/interface';

/*** Query for search the `products`
 ** And based on this, the connection of servers is built.
 */
export namespace FindQuery {
  /*** The connection to the service `one to one`.*/
  export const Pattern: {
    readonly cmd: string;
  } = {
    cmd: `${ENUM.NatsServicesQueue.PRODUCT}.find`,
  };

  /*** These values must be:
   **  It is a bridge between a `Client app` and a an `API service`.
   **  For `search` of the product.
   */
  export class Request implements Pick<IBaseData, 'id'> {
    id: ObjectId;
  }

  /*** These values must be:
   **  It is a bridge between an `API service` and a `Product service`.
   **  For `search` of the product in database.
   */
  export class Payload extends Request {}

  /*** These values must be returned from the service after the product has been found.*/
  export class Response implements Required<IBaseData & IProduct> {
    id: ObjectId;
    userId: ObjectId;
    storeId: ObjectId;
    price: number;
    amount: number;
    description: string;
    discount: number;
    isRemove: boolean;
    name: string;
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
