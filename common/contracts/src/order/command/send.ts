import { NatsRecord, NatsRecordBuilder } from '@nestjs/microservices';
import { ObjectId } from 'mongoose';

import { IBaseData, ENUM, IOrder } from '@common/interface';

/*** Command for: `confirm the process of the order`.
 ** And based on this, the connection of servers is built.
 */
export namespace SendCommand {
  /*** The connection to the service `one to one`.*/
  export const Pattern: {
    readonly cmd: string;
  } = {
    cmd: `${ENUM.NatsServicesQueue.ORDER}.send`,
  };

  /*** These values must be:
   **  For processing of the order.*/
  export class Request
    implements Required<Pick<IBaseData, 'id'> & Pick<IOrder, 'codeOrder' | 'send'>>
  {
    id: ObjectId;
    codeOrder: string;
    send: boolean;
  }

  /*** These values must be returned from the service after:
   **  The order has been processed `true`.*/
  export class Response implements Required<IBaseData & IOrder> {
    customer: ObjectId;
    products: ObjectId[];
    id: ObjectId;
    created: Date;
    updated: Date;
    codeOrder: string;
    price: number;
    processed: boolean;
    paid: boolean;
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