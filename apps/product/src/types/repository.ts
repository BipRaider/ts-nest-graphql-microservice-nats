import { Entity } from '../product.entity';
import { ISchema } from '../product.schema';

/*** A class for working only with the database. */
export interface IProductRepository {
  /** The function is for: `create` a product. */
  create: (data: Entity) => Promise<ISchema | null>;
  /** The function is for: `finding` a product by `id`. */
  find: (entity: Entity) => Promise<ISchema | null>;
  /** The function is for: `finding` a products by `userId`,`storeId` */
  get: (entity: Entity) => Promise<ISchema[] | null>;
  /** The function is for: `finding` a products. */
  all: (entity: Entity) => Promise<ISchema[] | null>;
  /*** The function is for:
   ** * `updating` a products.*/
  update: (entity: Entity) => Promise<ISchema | null>;
}
