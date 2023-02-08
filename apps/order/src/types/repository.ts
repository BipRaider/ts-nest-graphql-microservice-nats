import { Entity } from '../order.entity';
import { ISchema } from '../order.schema';

/*** A class for working only with the database. */
export interface IOrderRepository {
  /** The function is to `create` a order. */
  create: (data: Entity) => Promise<ISchema | null>;
  /** The function is to `finding` a order by `id` or `codeOrder` */
  find: (entity: Entity) => Promise<ISchema | null>;
  /** The function is to `finding` a orders by `customer` */
  get: (entity: Entity) => Promise<ISchema[] | null>;
  /** The function is to `finding` a orders. */
  all: (entity: Entity) => Promise<ISchema[] | null>;
}
