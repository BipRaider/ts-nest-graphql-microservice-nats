import { NatsRecord, NatsRecordBuilder } from '@nestjs/microservices';
import { ObjectId } from 'mongoose';

import { IBaseData, ENUM, IOrder } from '@common/interface';

/*** Command for: `update the order by receipt`.
 ** And based on this, the connection of servers is built.
 */
export namespace UpdateCommand {
  /*** The connection to the service `one to one`.*/
  export const Pattern: {
    readonly cmd: string;
  } = {
    cmd: `${ENUM.NatsServicesQueue.ORDER}.update`,
  };

  /*** These values must be:
   **  For update of the order.*/
  export class Request
    implements
      Pick<IBaseData, 'id'>,
      Partial<Omit<IOrder, 'products' | 'price' | 'customer' | 'codeOrder'>>
  {
    id: ObjectId;
    processed?: ENUM.ORDER.PROCESS;
    send?: ENUM.ORDER.SEND;
    received?: ENUM.ORDER.RECEIVE;
    exchange?: ENUM.ORDER.EXCHANGE;
    paid?: ENUM.ORDER.PAID;
    isCancel?: boolean;
    isState?: boolean;
  }

  /*** These values must be returned from the service after:
   **  The order has been `updated`.*/
  export class Response implements Required<IBaseData & IOrder> {
    /*** ID of the user or data. Who ordered.*/
    customer: ObjectId;
    /*** ID of the products or them data.*/
    products: ObjectId[];
    id: ObjectId;
    created: Date;
    updated: Date;
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
