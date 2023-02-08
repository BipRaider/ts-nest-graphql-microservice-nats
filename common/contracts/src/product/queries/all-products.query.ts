import { NatsRecord, NatsRecordBuilder } from '@nestjs/microservices';
import { ObjectId, Schema } from 'mongoose';

import { IBaseData, IProduct, ENUM } from '@common/interface';

/*** Query for get the `products`.
 ** And based on this, the connection of servers is built.
 */
export namespace AllQuery {
  /*** The connection to the service `one to one`.*/
  export const Pattern: {
    readonly cmd: string;
  } = {
    cmd: `${ENUM.NatsServicesQueue.PRODUCT}.all`,
  };

  /*** These values are needed to filter the products
   *  that can be retrieved from the product database.*/
  export class Request implements Partial<IProduct> {
    userId?: Schema.Types.ObjectId;
    storeId?: Schema.Types.ObjectId;
    name?: string;
    price?: number;
    amount?: number;
    description?: string;
    discount?: number;
    isRemove?: boolean;
    skip?: number;
    limit?: number;
  }

  /*** These values must be returned from the service after the products has been found.*/
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
