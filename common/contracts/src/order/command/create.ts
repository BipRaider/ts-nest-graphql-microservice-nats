import { NatsRecord, NatsRecordBuilder } from '@nestjs/microservices';
import { ObjectId } from 'mongoose';

import { IBaseData, IOrder, ENUM } from '@common/interface';

/*** Command for: `creating a order`.
 ** And based on this,the connection of servers is built.
 */
export namespace CreateCommand {
  /*** The connection to the service `one to one`.*/
  export const Pattern: {
    readonly cmd: string;
  } = {
    cmd: `${ENUM.NatsServicesQueue.ORDER}.create`,
  };

  /*** These values must be:
   **  It is a bridge between a `Client app` and a an `API service`.
   **  For `create` an order.
   */
  export class Request implements Pick<IOrder, 'products'> {
    products: ObjectId[];
  }
  /*** These values must be:
   **  It is a bridge between an `API service` and a `Order service`.
   **  For `create` an order in database.
   */
  export class Payload implements Pick<IOrder, 'customer' | 'products'> {
    customer: ObjectId;
    products: ObjectId[];
  }

  /*** These values must be returned from the service after:
   **  The `order` has been `created`.*/
  export class Response implements IBaseData, Pick<IOrder, 'paid' | 'price' | 'codeOrder'> {
    id: ObjectId;
    created: Date;
    updated: Date;
    codeOrder: string;
    price: number;
    paid: ENUM.ORDER.PAID;
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
