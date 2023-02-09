import { SendErrorUtil } from '@common/utils';
import { OrderContract } from '@common/contracts';

import { Entity } from '../order.entity';

/*** A class working like `mediator` with classes `controller` and `repository`.
 **  * Getting data from `controller` and modify them for `repository`.
 **  * Getting data from `repository` and modify them for `controller`.
 **  Where next steps:  `controller -> request -> repository -> response -> controller`.
 */
export interface IOrderService {
  /** The function to work and modify data for `creating` a order.*/
  create: (dto: OrderContract.CreateCommand.Request) => Promise<Entity | SendErrorUtil>;
  /** The function to work and modify data for `finding` a order by `id` or `codeOrder`.*/
  find: (dto: OrderContract.FindQuery.Request) => Promise<Entity | SendErrorUtil>;
  /** The function to work and modify data for `finding` a `orders` by `customer`.*/
  get: (dto: OrderContract.GetQuery.Request) => Promise<Entity[] | SendErrorUtil>;
  /** The function to work and modify data for `finding` a `orders`. */
  all: (dto: OrderContract.AllQuery.Request) => Promise<Entity[] | SendErrorUtil>;
}
