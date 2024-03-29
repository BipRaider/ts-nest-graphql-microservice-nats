import { AuthContract, UserContract } from '@common/contracts';
import { SendErrorUtil } from '@common/utils';

/*** A class for working only on `requests` and `responses` via a `class services`.
 ** Where next steps: `nats -> request -> service -> response -> nats`.
 */
export interface IUserController {
  /** The function to creating a `user`. */
  create: (
    payload: UserContract.CreateCommand.Payload,
  ) => Promise<UserContract.CreateCommand.Response | SendErrorUtil>;
  /** The function to getting `user`.*/
  find: (
    payload: UserContract.GetUserQuery.Payload,
  ) => Promise<UserContract.GetUserQuery.Response | SendErrorUtil>;
  /** The function to getting `users`.*/
  get: (
    payload: UserContract.GetUsersQuery.Payload,
  ) => Promise<UserContract.GetUsersQuery.Response[] | SendErrorUtil>;
  /** The function to getting `user` and checking him.*/
  auth: (
    payload: AuthContract.AuthQuery.Payload,
  ) => Promise<AuthContract.AuthQuery.Response | SendErrorUtil>;
}
