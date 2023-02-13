import { ProductContract } from '@common/contracts';
import { SendErrorUtil } from '@common/utils';

import { Entity } from '../product.entity';

/*** A class working like `mediator` with classes `controller` and `repository`.
 **  * Getting data from `controller` and modify them for `repository`.
 **  * Getting data from `repository` and modify them for `controller`.
 **  Where next steps:  `controller -> request -> repository -> response -> controller`.
 */
export interface IProductService {
  /** The function to work and modify data for `creating` a product.
   ** A product cannot be created with the same name for the same user.
   */
  create: (dto: ProductContract.CreateCommand.Payload) => Promise<Entity | SendErrorUtil>;
  /** The function to work and modify data for `finding` a product by `id`. */
  find: (dto: ProductContract.FindQuery.Payload) => Promise<Entity | SendErrorUtil>;
  /** The function to work and modify data for `finding` a `product` by `userId` or `storeId`.*/
  get: (dto: ProductContract.GetQuery.Payload) => Promise<Entity[] | SendErrorUtil>;
  /** The function to work and modify data for `finding` a `product`. */
  all: (dto: ProductContract.AllQuery.Payload) => Promise<Entity[] | SendErrorUtil>;
}
