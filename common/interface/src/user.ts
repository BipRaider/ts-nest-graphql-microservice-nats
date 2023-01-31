import { Nullable } from '../index';

export enum Roles {
  /**All registered `users` have this `role`.*/
  USER = 'User',
  /**Have all the rights in the system.*/
  ADMIN = 'Admin',
}
export interface IPrivateData {
  /** User name */
  firstname?: Nullable<string>;
  /** User second name */
  lastname?: Nullable<string>;
}

export interface IUser {
  /** User name.*/
  name: string;
  /** User email address*/
  email: string;
  /** User password*/
  password: string;
  /** User private data*/
  privateData?: IPrivateData;
  /** User roles in the system.*/
  roles?: Roles[];
}

export type Timestamp = unknown;
