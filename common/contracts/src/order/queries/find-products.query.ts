import { NatsRecord, NatsRecordBuilder } from '@nestjs/microservices';
import { ObjectId } from 'mongoose';

import { IBaseData, IProduct, ENUM, IOrder, IUser } from '@common/interface';

/*** Query for search the `order`
 ** And based on this, the connection of servers is built.
 */
export namespace FindQuery {
  /*** The connection to the service `one to one`.*/
  export const Pattern: {
    readonly cmd: string;
  } = {
    cmd: `${ENUM.NatsServicesQueue.ORDER}.find`,
  };

  /*** Must be `id` or `codeOrder` to search for a `order`.*/
  export class Request implements Partial<Pick<IBaseData, 'id'> & Pick<IOrder, 'codeOrder'>> {
    id?: ObjectId;
    codeOrder?: string;
  }

  /*** These values must be returned from the service after the order has been found.*/
  export class Response implements Required<IBaseData & Omit<IOrder, 'customer' | 'products'>> {
    created: Date;
    updated: Date;
    id: ObjectId;
    /*** ID of the user or data. Who ordered. */
    customer: ObjectId | Omit<IUser, 'password'>;
    /*** ID of the products or them data.*/
    products: ObjectId[] | IProduct[];
    codeOrder: string;
    price: number;
    paid: boolean;
    processed: boolean;
    send: boolean;
    received: boolean;
    exchange: boolean;
    isCancel: boolean;
    isState: boolean;
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
