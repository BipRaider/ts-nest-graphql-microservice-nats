import { Schema, Document, Model, ObjectId } from 'mongoose';
import { IProduct } from '@common/interface';
import { Entity } from './product.entity';

/*** The `Product` schema for database */
export interface ISchema extends Document<ObjectId | string>, IProduct {
  readonly id?: ObjectId;
  readonly _id: Schema.Types.ObjectId;
  readonly created?: Date;
  readonly updated?: Date;
}

/*** The properties of the `Product`. */
export type TProduct = Pick<ISchema, '_id' | 'id' | 'created' | 'updated'> & IProduct;
/*** The `Product` schema for database. */
export type Instance = ISchema;
/*** The `Product` model for database. */
export interface IModel extends Model<Instance> {
  addition: (entity: Entity) => Promise<Instance>;
}

export const ProductSchema = new Schema<ISchema, IModel>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, immutable: true },
    storeId: { type: Schema.Types.ObjectId, required: true, immutable: true },
    name: {
      type: String,
      default: 'default name',
      required: true,
      immutable: true,
      maxlength: 40,
      minlength: 1,
    },
    price: { type: Number, default: 0.01, required: true, max: 10_000_000 },
    amount: { type: Number, default: 0, required: true, max: 10_000_000 },
    discount: { type: Number, default: 0, required: true, min: 0, max: 100 },
    description: { type: String, default: 'description', required: true, maxlength: 200 },
    isRemove: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
  },
);
