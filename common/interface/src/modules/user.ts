import { Nullable } from '../../index';
import { Roles } from '../enum';

export interface IPrivateData {
  /** User name */
  readonly firstname?: Nullable<string>;
  /** User second name */
  readonly lastname?: Nullable<string>;
}

export interface IUser {
  /** User name.*/
  readonly name: string;
  /** User email address*/
  readonly email: string;
  /** User password*/
  password: string;
  /** User private data*/
  readonly privateData?: IPrivateData;
  /** User roles in the system.*/
  readonly roles?: Roles[];

  readonly tokens?: string;
  readonly active?: boolean;
  readonly githubId?: string;
  readonly redditId?: string;
  readonly googleId?: string;
  readonly avatar?: string;
}

export type TUpdateUserDB = Required<Omit<IUser, 'email'>>;
