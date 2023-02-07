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

  /*** Must be `id` to search for a `product`.*/
  export class Request implements Pick<IBaseData, 'id'> {
    id: ObjectId;
  }

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
  export const build = (data: Request): NatsRecord<Request, Header> => {
    return new NatsRecordBuilder<Request>(data).build();
  };

  /*** The data types to be sent to the service.*/
  export type Record = NatsRecord<Request, Header>;
}
