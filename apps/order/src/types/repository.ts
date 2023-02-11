import { SendErrorUtil } from '@common/utils';

import { Entity } from '../order.entity';
import { ISchema } from '../order.schema';

/*** A class for working only with the database. */
export interface IOrderRepository {
  /*** The function is for:
   ** * `create` a order. */
  create: (data: Entity) => Promise<ISchema | null>;
  /*** The function is fot:
   ** *  `finding` a order by `id` or `codeOrder`.*/
  find: (entity: Entity) => Promise<ISchema | null>;
  /*** The function is for:
   ** *  `finding` a orders by `customer`.*/
  get: (entity: Entity) => Promise<ISchema[] | null>;
  /*** The function is for:
   ** * `finding` a orders.*/
  all: (entity: Entity) => Promise<ISchema[] | null>;
  /*** The function is for:
   ** * `updating` a order.*/
  update: (entity: Entity) => Promise<ISchema | null>;
  /*** The function is for:
   ** *  `finding` a order by  `codeOrder`.
   * @returns  `SendErrorUtil` | `Entity`
   */
  findOrder: (data: Partial<ISchema>) => Promise<SendErrorUtil | Entity>;
  /*** The function is for:
   ** *  `updating` a order.
   * @returns  `SendErrorUtil` | `Entity`
   */
  updateOrder: (data: Partial<ISchema>) => Promise<SendErrorUtil | Entity>;
}
