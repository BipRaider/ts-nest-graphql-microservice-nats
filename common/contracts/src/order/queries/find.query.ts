import { NatsRecord, NatsRecordBuilder } from '@nestjs/microservices';
import { ObjectId } from 'mongoose';

import { IBaseData, ENUM, IOrder } from '@common/interface';

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

  /*** These values are needed:
   **  It is a bridge between a `Client app` and a an `API service`.
   **  For `search` of the order by `id` or `codeOrder`.
   */
  export class Request implements Partial<Pick<IBaseData, 'id'> & Pick<IOrder, 'codeOrder'>> {
    id?: ObjectId;
    codeOrder?: string;
  }

  /*** These values must be:
   **  It is a bridge between an `API service` and a `Order service`.
   **  For `search` of the order by `id` or `codeOrder` in database.
   */
  export class Payload extends Request {
    finderId: ObjectId;
  }

  /*** These values must be returned from the service after the order has been found.*/
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
  export const build = (data: Payload): NatsRecord<Payload, Header> => {
    return new NatsRecordBuilder<Payload>(data).build();
  };

  /*** The data types to be sent to the service.*/
  export type Record = NatsRecord<Payload, Header>;
}
