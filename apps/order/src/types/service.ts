import { SendErrorUtil } from '@common/utils';
import { OrderContract } from '@common/contracts';

import { Entity } from '../order.entity';

/*** A class working like `mediator` with classes `controller` and `repository`.
 **  * Getting data from `controller` and modify them for `repository`.
 **  * Getting data from `repository` and modify them for `controller`.
 **  Where next steps:  `controller -> request -> repository -> response -> controller`.
 */
export interface IOrderService {
  /*** The function to work and modify data for:
   ** * `creating` a order.*/
  create: (dto: OrderContract.CreateCommand.Payload) => Promise<Entity | SendErrorUtil>;
  /*** The function to work and modify data for:
   ** * `update` a order by `id` .*/
  update: (dto: OrderContract.UpdateCommand.Payload) => Promise<Entity | SendErrorUtil>;
  /*** The function to work and modify data for:
   ** * `finding` a order by `id` or `codeOrder`.*/
  find: (dto: OrderContract.FindQuery.Payload) => Promise<Entity | SendErrorUtil>;
  /*** The function to work and modify data for:
   ** * `finding` a `orders` by `customer`.*/
  get: (dto: OrderContract.GetQuery.Payload) => Promise<Entity[] | SendErrorUtil>;
  /*** The function to work and modify data for:
   ** * `finding` a `orders`. */
  all: (dto: OrderContract.AllQuery.Payload) => Promise<Entity[] | SendErrorUtil>;

  /*** The function  modify data for:
   ** * `updating` the `order`. */
  paid: (dto: OrderContract.ReceiptPaidCommand.Request) => Promise<Entity | SendErrorUtil>;
  /*** The function  modify data for:
   ** * `updating` the `order`. */
  send: (dto: OrderContract.SendCommand.Request) => Promise<Entity | SendErrorUtil>;
  /*** The function  modify data for:
   ** * `updating` the `order`. */
  receive: (dto: OrderContract.ReceivedCommand.Request) => Promise<Entity | SendErrorUtil>;
  /*** The function  modify data for:
   ** * `updating` the `order`. */
  exchange: (dto: OrderContract.ExchangeCommand.Request) => Promise<Entity | SendErrorUtil>;
  /*** The function  modify data for:
   ** * `updating` the `order`. */
  processed: (dto: OrderContract.ProcessedCommand.Request) => Promise<Entity | SendErrorUtil>;
}
