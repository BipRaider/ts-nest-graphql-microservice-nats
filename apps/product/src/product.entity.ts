import { Schema } from 'mongoose';

import { IBaseData, IProduct, TUpdateProductDB } from '@common/interface';
import { ProductContract } from '@common/contracts';

import { ISchema } from './product.schema';

export type TUpdateDB = TUpdateProductDB;
/** Class to working with the data use
 ** Always work via this class when work a data of the product.
 */
export class Entity implements Required<IProduct & IBaseData> {
  //Database properties
  public id: Schema.Types.ObjectId = undefined;
  public created: Date = undefined;
  public updated: Date = undefined;
  //Product properties
  public userId: Schema.Types.ObjectId = undefined;
  public storeId: Schema.Types.ObjectId = undefined;
  public price: number = undefined;
  public amount: number = undefined;
  public description: string = undefined;
  public discount: number = undefined;
  public isRemove: boolean = undefined;
  public name: string = undefined;
  //Filter properties
  public skip: number = undefined;
  public limit: number = undefined;

  constructor(data: Partial<ISchema>) {
    //product
    if ('userId' in data) this.userId = data.userId;
    if ('storeId' in data) this.storeId = data.storeId;
    if ('price' in data) this.price = data.price;
    if ('amount' in data) this.amount = data.amount;
    if ('description' in data) this.description = data.description;
    if ('discount' in data) this.discount = data.discount;
    if ('isRemove' in data) this.isRemove = data.isRemove;
    if ('name' in data) this.name = data.name;
    //db
    if ('id' in data) this.id = data.id;
    if ('_id' in data) this.id = data._id;
    if ('created' in data) this.created = data.created;
    if ('updated' in data) this.updated = data.updated;
  }

  /*** When you need to paginate the list of `products`, use this function.*/
  public paginate = (data: ProductContract.AllQuery.Request): this => {
    if ('skip' in data) this.skip = data.skip;
    if ('limit' in data) this.limit = data.limit;
    return this;
  };

  /*** Values for create a user. */
  public create = (): Partial<IProduct & IBaseData> => {
    const property = {
      name: this.name,
      storeId: this.storeId,
      userId: this.userId,
      description: this.description,
      discount: this.discount,
      price: this.price,
      amount: this.amount,
    };
    return this.filterProperty(property);
  };

  public find = (): Partial<IProduct & IBaseData> => {
    const property = {
      ...this.create(),
      isRemove: this.isRemove,
    };
    return this.filterProperty(property);
  };

  public updateDB = (): Partial<TUpdateDB> => {
    const property: TUpdateDB = {
      description: this.description,
      discount: this.discount,
      price: this.price,
      amount: this.amount,
      isRemove: this.isRemove,
    };
    return this.filterProperty(property);
  };

  //Private func
  private filterProperty = (
    property: Partial<IProduct & IBaseData>,
  ): Partial<IProduct & IBaseData> => {
    for (const key in property) {
      if (property[key] === null) delete property[key];
      if (property[key] === undefined) delete property[key];
    }
    return property;
  };
}
