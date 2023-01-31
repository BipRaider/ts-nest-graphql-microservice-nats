import { Entity } from '../user.entity';
import { ISchema } from '../user.schema';

/*** A class for working only with the database. */
export interface IUserRepository {
  /** The function is to `create` a user. */
  create: (data: Entity) => Promise<ISchema | null>;
  /** The function is to `finding` a user by `id` or `email`. */
  find: (entity: Entity) => Promise<ISchema | null>;
  /** The function is to `finding` a users. */
  get: (entity: Entity) => Promise<ISchema[] | null>;
  /** The function is to `finding` a user by `email`. */
  auth: (entity: Entity) => Promise<ISchema | null>;
}
