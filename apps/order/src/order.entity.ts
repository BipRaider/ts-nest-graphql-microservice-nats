import { Schema, ObjectId } from 'mongoose';

import { IBaseData, IOrder, ENUM, TUpdateOrderDB } from '@common/interface';
import { ProductContract } from '@common/contracts';

import { ISchema } from './order.schema';

export type TUpdateDB = TUpdateOrderDB;

/** Class to working with the data use
 ** Always work via this class when work a data of the order.
 */
export class Entity implements Required<IOrder & IBaseData> {
  //Database properties
  public id: Schema.Types.ObjectId = undefined;
  public created: Date = undefined;
  public updated: Date = undefined;
  //Order properties
  public price: number = undefined;
  public customer: ObjectId = undefined;
  public products: ObjectId[] = undefined;
  public codeOrder: string = undefined;
  public paid: ENUM.ORDER.PAID = undefined;
  public processed: ENUM.ORDER.PROCESS = undefined;
  public send: ENUM.ORDER.SEND = undefined;
  public received: ENUM.ORDER.RECEIVE = undefined;
  public exchange: ENUM.ORDER.EXCHANGE = undefined;
  public isCancel: boolean = undefined;
  public isState: boolean = undefined;
  //Filter properties
  public skip: number = undefined;
  public limit: number = undefined;

  constructor(data: Partial<ISchema>) {
    //product
    if ('price' in data) this.price = data.price;
    if ('customer' in data) this.customer = data.customer;
    if ('products' in data) this.products = data.products;
    if ('codeOrder' in data) this.codeOrder = data.codeOrder;
    if ('paid' in data) this.paid = data.paid;
    // state
    if ('processed' in data) this.processed = data.processed;
    if ('send' in data) this.send = data.send;
    if ('received' in data) this.received = data.received;
    if ('exchange' in data) this.exchange = data.exchange;
    if ('isCancel' in data) this.isCancel = data.isCancel;
    if ('isState' in data) this.isState = data.isState;
    // db
    if ('id' in data) this.id = data.id;
    if ('_id' in data) this.id = data._id;
    if ('created' in data) this.created = data.created;
    if ('updated' in data) this.updated = data.updated;
  }

  /*** When you need to paginate the list of `order`, use this function.*/
  public paginate = (data: ProductContract.AllQuery.Request): this => {
    if ('skip' in data) this.skip = data.skip;
    if ('limit' in data) this.limit = data.limit;
    return this;
  };

  /*** Values for create a user. */
  public create = (): Partial<IOrder & IBaseData> => {
    const property = {
      price: this.price,
      customer: this.customer,
      codeOrder: this.codeOrder,
      products: this.products,
    };
    return this.filterProperty(property);
  };

  public find = (): Partial<IOrder & IBaseData> => {
    const property = {
      ...this.create(),
      paid: this.paid,
      isState: this.isState,
      isCancel: this.isCancel,
      exchange: this.exchange,
      received: this.received,
      processed: this.processed,
      send: this.send,
    };

    return this.filterProperty(property);
  };

  public updateDB = (): Partial<TUpdateDB> => {
    const property: TUpdateDB = {
      isState: this.isState,
      isCancel: this.isCancel,
      paid: this.paid,
      exchange: this.exchange,
      received: this.received,
      processed: this.processed,
      send: this.send,
    };
    return this.filterProperty(property);
  };

  //Private func
  private filterProperty = (property: Partial<IOrder & IBaseData>): Partial<IOrder & IBaseData> => {
    for (const key in property) {
      if (property[key] === null) delete property[key];
      if (property[key] === undefined) delete property[key];
    }
    return property;
  };
}
