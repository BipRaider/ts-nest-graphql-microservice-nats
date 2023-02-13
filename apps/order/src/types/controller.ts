import { SendErrorUtil } from '@common/utils';
import { OrderContract } from '@common/contracts';

/*** A class for working only on `requests` and `responses` via a `class services`.
 ** Where next steps: `nats -> request -> service -> response -> nats`.
 */
export interface IOrderController {
  /** The function to creating a `order`. */
  create: (
    payload: OrderContract.CreateCommand.Payload,
  ) => Promise<OrderContract.CreateCommand.Response | SendErrorUtil>;
  /** The function to getting `order`.*/
  find: (
    payload: OrderContract.FindQuery.Payload,
  ) => Promise<OrderContract.FindQuery.Response | SendErrorUtil>;
  /** The function to getting `orders`.*/
  get: (
    payload: OrderContract.GetQuery.Payload,
  ) => Promise<OrderContract.GetQuery.Response[] | SendErrorUtil>;
  /** The function to getting `orders`.*/
  all: (
    payload: OrderContract.AllQuery.Payload,
  ) => Promise<OrderContract.AllQuery.Response[] | SendErrorUtil>;
}
