import { ProductContract } from '@common/contracts';
import { SendErrorUtil } from '@common/utils';

/*** A class for working only on `requests` and `responses` via a `class services`.
 ** Where next steps: `nats -> request -> service -> response -> nats`.
 */
export interface IProductController {
  /** The function to creating a `user`. */
  create: (
    payload: ProductContract.CreateCommand.Request,
  ) => Promise<ProductContract.CreateCommand.Response | SendErrorUtil>;
  /** The function to getting `user`.*/
  find: (
    payload: ProductContract.FindQuery.Request,
  ) => Promise<ProductContract.FindQuery.Response | SendErrorUtil>;
  /** The function to getting `users`.*/
  get: (
    payload: ProductContract.GetQuery.Request,
  ) => Promise<ProductContract.GetQuery.Response[] | SendErrorUtil>;
  /** The function to getting `users`.*/
  all: (
    payload: ProductContract.AllQuery.Request,
  ) => Promise<ProductContract.AllQuery.Response[] | SendErrorUtil>;
}
