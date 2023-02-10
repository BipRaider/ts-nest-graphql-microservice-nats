import { NatsRecord, NatsRecordBuilder } from '@nestjs/microservices';
import { ObjectId } from 'mongoose';

import { IBaseData, IOrder, ENUM } from '@common/interface';

/*** Query for get the `order`.
 ** And based on this, the connection of servers is built.
 */
export namespace AllQuery {
  /*** The connection to the service `one to one`.*/
  export const Pattern: {
    readonly cmd: string;
  } = {
    cmd: `${ENUM.NatsServicesQueue.ORDER}.all`,
  };

  /*** These values are needed to filter the `orders`
   *  that can be retrieved from the `order` database.*/
  export class Request implements Partial<IOrder> {
    skip?: number;
    limit?: number;
    customer?: ObjectId;
    codeOrder?: string;
    price?: number;
    processed?: ENUM.ORDER.PROCESS;
    paid?: ENUM.ORDER.PAID;
    send?: ENUM.ORDER.SEND;
    received?: ENUM.ORDER.RECEIVE;
    exchange?: ENUM.ORDER.EXCHANGE;
    purchase?: boolean;
    isCancel?: boolean;
    isState?: boolean;
  }

  /*** These values must be returned from the service after the `orders` has been found.*/
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
