import { AuthContract, UserContract } from '@common/contracts';
import { SendErrorUtil } from '@common/utils';

import { Entity } from '../user.entity';

/*** A class working like `mediator` with classes `controller` and `repository`.
 **  * Getting data from `controller` and modify them for `repository`.
 **  * Getting data from `repository` and modify them for `controller`.
 **  Where next steps:  `controller -> request -> repository -> response -> controller`.
 */
export interface IUserService {
  /** The function to work and modify data for `creating` a user. */
  create: (dto: UserContract.CreateCommand.Request) => Promise<Entity | SendErrorUtil>;
  /** The function to work and modify data for `finding` a user by `id` or `email`. */
  find: (dto: UserContract.GetUserQuery.Request) => Promise<Entity | SendErrorUtil>;
  /** The function to work and modify data for `finding` a `users`. */
  get: (dto: UserContract.GetUsersQuery.Request) => Promise<Entity[] | SendErrorUtil>;
  /** The function to work and modify data for `finding` a user by  `email`. */
  auth: (dto: AuthContract.AuthQuery.Request) => Promise<Entity | SendErrorUtil>;
}
