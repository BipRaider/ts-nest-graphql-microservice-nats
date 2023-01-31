import { IPrivateData, IUser, Roles } from '@common/interface';
import { Schema, Document, Model, ObjectId } from 'mongoose';
import { Entity } from './user.entity';

/*** The `User` schema for database */
export interface ISchema extends Document<ObjectId | string>, IUser {
  id?: ObjectId;
  _id: Schema.Types.ObjectId;
  readonly created?: Date;
  readonly updated?: Date;
}
/*** The properties of the `User` */
export type TUser = Pick<ISchema, '_id' | 'id' | 'created' | 'updated'> & IUser;
/*** The `User` schema for database */
export type Instance = ISchema;
/*** The `User` model for database */
export interface IModel extends Model<Instance> {
  addition: (entity: Entity) => Promise<Instance>;
}

const PrivateDataSchema = new Schema<IPrivateData>(
  {
    firstname: { type: String, required: false },
    lastname: { type: String, required: false },
  },
  { _id: false },
);

export const UserSchema = new Schema<ISchema, IModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, immutable: true },
    password: { type: String, required: true },
    roles: { type: [String], enum: Object.values(Roles), required: true, default: [Roles.USER] },
    privateData: { type: Schema.Types.Mixed, of: PrivateDataSchema, required: false, default: {} },
  },
  {
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
  },
);
