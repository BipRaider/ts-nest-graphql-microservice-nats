import { Entity } from '../order.entity';
import { ISchema } from '../product.schema';

/*** A class for working only with the database. */
export interface IProductRepository {
  /** The function is to `create` a product. */
  create: (data: Entity) => Promise<ISchema | null>;
  /** The function is to `finding` a product by `id`. */
  find: (entity: Entity) => Promise<ISchema | null>;
  /** The function is to `finding` a products by `userId`,`storeId` */
  get: (entity: Entity) => Promise<ISchema[] | null>;
  /** The function is to `finding` a products. */
  all: (entity: Entity) => Promise<ISchema[] | null>;
}
