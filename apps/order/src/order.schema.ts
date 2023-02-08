import { Schema, Document, Model, ObjectId } from 'mongoose';
import { IOrder, ENUM } from '@common/interface';
import { PasswordUtil } from '@common/utils';
import { Entity } from './order.entity';

/*** The `Product` schema for database */
export interface ISchema extends Document<ObjectId | string>, IOrder {
  readonly id?: ObjectId;
  readonly _id: Schema.Types.ObjectId;
  readonly created?: Date;
  readonly updated?: Date;
}

/*** The properties of the `Order`. */
export type TOrder = Pick<ISchema, '_id' | 'id' | 'created' | 'updated'> & IOrder;
/*** The `Order` schema for database. */
export type Instance = ISchema;
/*** The `Order` model for database. */
export interface IModel extends Model<Instance> {
  addition: (entity: Entity) => Promise<Instance>;
}

export const OrderSchema = new Schema<ISchema, IModel>(
  {
    customer: { type: Schema.Types.ObjectId, required: true, immutable: true },
    products: [{ type: Schema.Types.ObjectId, required: true }],
    codeOrder: {
      type: String,
      default: PasswordUtil.createPassword(10),
      immutable: true,
      required: true,
      maxlength: 10,
    },

    price: { type: Number, default: 0.01, required: true },
    //State order.
    paid: { type: Boolean, default: false, required: true },
    send: { type: Boolean, default: false, required: true },
    processed: { type: Boolean, default: false, required: true },
    received: { type: Boolean, default: false, required: true },
    purchase: { type: Boolean, default: false, required: true },
    isCancel: { type: Boolean, default: false, required: true },
    isState: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
  },
);
