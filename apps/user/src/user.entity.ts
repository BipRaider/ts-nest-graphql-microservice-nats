import { IBaseData, IPrivateData, IUser, Roles } from '@common/interface';
import { Schema } from 'mongoose';
import { ISchema } from './user.schema';
import { UserContract } from '@common/contracts';

/** Class to working with the data use
 ** Always work via this class when work a data of the user.
 */
export class Entity implements Required<IUser & IBaseData> {
  public password: string = undefined;
  public email: string = undefined;
  public name: string = undefined;
  public privateData: IPrivateData = undefined;
  public roles: Roles[] = undefined;
  public id: Schema.Types.ObjectId = undefined;
  public created: Date = undefined;
  public updated: Date = undefined;

  public skip: number = undefined;
  public limit: number = undefined;
  constructor(data: Partial<ISchema>) {
    if (data.name) this.name = data.name;
    if (data.email) this.email = data.email;
    if (data.password) this.password = data.password;
    if (data.roles) this.roles = data.roles;
    if (data.privateData) this.privateData = data.privateData;
    if (data.created) this.created = data.created;
    if (data.id) this.id = data.id;
    if (data._id) this.id = data._id;
    if (data.updated) this.updated = data.updated;
  }
  /*** When you need to filter the list of users, use this function.*/
  public filter = (data: UserContract.GetUsersQuery.Request): this => {
    if (data.skip) this.skip = data.skip || null;
    if (data.limit) this.limit = data.limit || null;
    return this;
  };
}
