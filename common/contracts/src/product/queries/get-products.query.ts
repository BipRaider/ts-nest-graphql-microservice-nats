import { NatsRecord, NatsRecordBuilder } from '@nestjs/microservices';
import { ObjectId } from 'mongoose';

import { IBaseData, IProduct, ENUM } from '@common/interface';

/*** Query for get the `products`.
 ** And based on this, the connection of servers is built.
 */
export namespace GetQuery {
  /*** The connection to the service `one to one`.*/
  export const Pattern: {
    readonly cmd: string;
  } = {
    cmd: `${ENUM.NatsServicesQueue.PRODUCT}.get`,
  };

  /*** Must be one of these values `userId` or `storeId to get for products.*/
  export class Request implements Partial<Pick<IProduct, 'userId' | 'storeId'>> {
    userId?: ObjectId;
    storeId?: ObjectId;
    skip?: number;
    limit?: number;
  }

  /*** These values must be returned from the service after the product has been found.*/
  export class Response implements Required<IBaseData & IProduct> {
    userId: ObjectId;
    storeId: ObjectId;
    name: string;
    price: number;
    amount: number;
    description: string;
    discount: number;
    isRemove: boolean;
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
  export type Record = NatsRecord<Request, Header>;
}
