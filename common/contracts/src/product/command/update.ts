import { NatsRecord, NatsRecordBuilder } from '@nestjs/microservices';
import { ObjectId } from 'mongoose';

import { IBaseData, IProduct, ENUM } from '@common/interface';

/*** Command for: `updating a product`.
 ** And based on this,the connection of servers is built.
 */
export namespace UpdateCommand {
  /*** The connection to the service `one to one`.*/
  export const Pattern: {
    readonly cmd: string;
  } = {
    cmd: `${ENUM.NatsServicesQueue.PRODUCT}.update`,
  };

  /*** These values must be:
   **  It is a bridge between a `Client app` and a an `API service`.
   **  For update of `the product`.
   */
  export class Request
    implements Pick<IBaseData, 'id'>, Partial<Omit<IProduct, 'userId' | 'name' | 'storeId'>>
  {
    id: ObjectId;
    price?: number;
    amount?: number;
    description?: string;
    discount?: number;
    isRemove?: boolean;
  }

  /*** These values must be:
   **  It is a bridge between an `API service` and a `Product service`.
   **  For update of `the product` in database.
   */
  export class Payload
    implements
      Pick<IBaseData, 'id'>,
      Partial<Omit<IProduct, 'name' | 'storeId'>>,
      Pick<IProduct, 'userId'>
  {
    userId: ObjectId;
    id: ObjectId;
    price?: number;
    amount?: number;
    description?: string;
    discount?: number;
    isRemove?: boolean;
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
  export const build = (data: Payload): NatsRecord<Payload, Header> => {
    return new NatsRecordBuilder<Payload>(data).build();
  };

  /*** The data types to be sent to the service.*/
  export type Record = NatsRecord<Payload, Header>;
}
