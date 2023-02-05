import { Nullable } from '../index';
import { Roles } from './enum';

// /** User roles in the system.*/
// export enum Roles {
//   /**All registered `users` have this `role`.*/
//   USER = 'User',
//   /**Have all the rights in the system.*/
//   ADMIN = 'Admin',
// }

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

  tokens?: string;
  active?: boolean;
  githubId?: string;
  redditId?: string;
  googleId?: string;
  avatar?: string;
}

export type Timestamp = unknown;
