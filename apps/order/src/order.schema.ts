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
      default: PasswordUtil.createPassword(14),
      immutable: true,
      required: true,
      maxlength: 14,
    },

    price: {
      type: Number,
      default: 0.01,
      // immutable: true,
      required: true,
    },
    //State order.
    paid: {
      type: String,
      enum: Object.values(ENUM.ORDER.PAID),
      default: ENUM.ORDER.PAID.expectation,
      required: true,
    },
    send: {
      type: String,
      enum: Object.values(ENUM.ORDER.SEND),
      default: ENUM.ORDER.SEND.unused,
      required: true,
    },
    processed: {
      type: String,
      enum: Object.values(ENUM.ORDER.PROCESS),
      default: ENUM.ORDER.PROCESS.unused,
      required: true,
    },
    received: {
      type: String,
      enum: Object.values(ENUM.ORDER.RECEIVE),
      default: ENUM.ORDER.RECEIVE.unused,
      required: true,
    },
    exchange: {
      type: String,
      enum: Object.values(ENUM.ORDER.EXCHANGE),
      default: ENUM.ORDER.EXCHANGE.unused,
      required: true,
    },
    isCancel: { type: Boolean, default: false, required: true },
    isState: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
  },
);
