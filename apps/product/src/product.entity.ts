import { Schema } from 'mongoose';

import { IBaseData, IProduct } from '@common/interface';
import { ProductContract } from '@common/contracts';

import { ISchema } from './product.schema';

/** Class to working with the data use
 ** Always work via this class when work a data of the user.
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
    // console.dir(Object.keys(Entity));
    //product
    if (data.userId) this.userId = data.userId;
    if (data.storeId) this.storeId = data.storeId;
    if (data.price) this.price = data.price;
    if (data.amount) this.amount = data.amount;
    if (data.description) this.description = data.description;
    if (data.discount) this.discount = data.discount;
    if (data.isRemove) this.isRemove = data.isRemove;
    if (data.name) this.name = data.name;
    //db
    if (data.id) this.id = data.id;
    if (data._id) this.id = data._id;
    if (data.created) this.created = data.created;
    if (data.updated) this.updated = data.updated;
  }
  /*** When you need to filter the list of users, use this function.*/
  public filter = (data: ProductContract.AllQuery.Request): this => {
    if (data.skip) this.skip = data.skip || null;
    if (data.limit) this.limit = data.limit || null;
    return this;
  };
  /*** Values for create a user. */
  public create = () => {
    return {
      name: this.name,
      storeId: this.storeId,
      userId: this.userId,
      description: this.description,
      discount: this.discount,
      price: this.price,
      amount: this.amount,
      isRemove: this.isRemove,
    };
  };
}
