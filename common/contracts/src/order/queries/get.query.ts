import { NatsRecord, NatsRecordBuilder } from '@nestjs/microservices';
import { ObjectId } from 'mongoose';

import { IBaseData, ENUM, IOrder } from '@common/interface';

/*** Query for get the `order`.
 ** And based on this, the connection of servers is built.
 */
export namespace GetQuery {
  /*** The connection to the service `one to one`.*/
  export const Pattern: {
    readonly cmd: string;
  } = {
    cmd: `${ENUM.NatsServicesQueue.ORDER}.get`,
  };

  /*** These values are needed:
   **  It is a bridge between a `Client app` and a an `API service`.
   **  For `get` the orders by `customer`.
   */
  export class Request implements Partial<Pick<IOrder, 'customer'>> {
    customer: ObjectId;
    skip?: number;
    limit?: number;
  }

  /*** Must be one of these values `customer` to get for `order`.*/
  /*** These values must be:
   **  It is a bridge between an `API service` and a `Order service`.
   **  For `get` the orders by `customer` from database.
   */
  export class Payload extends Request {
    finderId: ObjectId;
  }

  /*** These values must be returned from the service after the `order` has been found.*/
  export class Response implements Required<IBaseData & IOrder> {
    created: Date;
    updated: Date;
    id: ObjectId;
    customer: ObjectId;
    products: ObjectId[];
    codeOrder: string;
    price: number;
    processed: ENUM.ORDER.PROCESS;
    paid: ENUM.ORDER.PAID;
    send: ENUM.ORDER.SEND;
    received: ENUM.ORDER.RECEIVE;
    exchange: ENUM.ORDER.EXCHANGE;
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
