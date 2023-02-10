import { Schema } from 'mongoose';

import { IBaseData, IPrivateData, IUser, TUpdateUserDB, ENUM } from '@common/interface';
import { UserContract } from '@common/contracts';

import { ISchema } from './user.schema';

export type TUpdateDB = TUpdateUserDB;
/** Class to working with the data use
 ** Always work via this class when work a data of the user.
 */
export class Entity implements Required<IUser & IBaseData> {
  public id: Schema.Types.ObjectId = undefined;
  public created: Date = undefined;
  public updated: Date = undefined;

  public password: string = undefined;
  public email: string = undefined;
  public name: string = undefined;
  public privateData: IPrivateData = undefined;
  public roles: ENUM.Roles[] = undefined;
  public tokens: string = undefined;
  public active: boolean = undefined;
  public githubId: string = undefined;
  public redditId: string = undefined;
  public googleId: string = undefined;
  public avatar: string = undefined;

  public skip: number = undefined;
  public limit: number = undefined;

  constructor(data: Partial<ISchema>) {
    //User
    if ('name' in data) this.name = data.name;
    if ('email' in data) this.email = data.email;
    if ('password' in data) this.password = data.password;
    if ('roles' in data) this.roles = data.roles;
    if ('privateData' in data) this.privateData = data.privateData;
    if ('avatar' in data) this.avatar = data.avatar;
    if ('active' in data) this.active = data.active;
    if ('tokens' in data) this.tokens = data.tokens;
    if ('githubId' in data) this.githubId = data.githubId;
    if ('redditId' in data) this.redditId = data.redditId;
    if ('googleId' in data) this.googleId = data.googleId;
    //Database
    if ('id' in data) this.id = data.id;
    if ('_id' in data) this.id = data._id;
    if ('created' in data) this.created = data.created;
    if ('updated' in data) this.updated = data.updated;
  }
  /*** When you need to filter the list of users, use this function.*/
  public filter = (data: UserContract.GetUsersQuery.Request): this => {
    if ('skip' in data) this.skip = data.skip;
    if ('limit' in data) this.limit = data.limit;
    return this;
  };
  /*** Values for create a user. */
  public create = (): Partial<IUser & IBaseData> => {
    const property = {
      password: this.password,
      email: this.email,
      name: this.name,
      privateData: this.privateData,
      tokens: this.tokens,
      githubId: this.githubId,
      redditId: this.redditId,
      googleId: this.googleId,
      avatar: this.avatar,
    };

    return this.filterProperty(property);
  };

  public updateDB = (): Partial<TUpdateDB> => {
    const property: TUpdateDB = {
      password: this.password,
      name: this.name,
      privateData: this.privateData,
      roles: this.roles,
      tokens: this.tokens,
      active: this.active,
      githubId: this.githubId,
      redditId: this.redditId,
      googleId: this.googleId,
      avatar: this.avatar,
    };

    return this.filterProperty(property);
  };

  //Private func
  private filterProperty = (property: Partial<IUser & IBaseData>): Partial<IUser & IBaseData> => {
    for (const key in property) {
      if (property[key] === null) delete property[key];
      if (property[key] === undefined) delete property[key];
      if (typeof property[key] === 'object') this.filterProperty(property[key]);
    }
    return property;
  };
}
