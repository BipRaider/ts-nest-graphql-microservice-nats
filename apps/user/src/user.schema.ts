import { IPrivateData, IUser, ENUM } from '@common/interface';
import { Schema, Document, Model, ObjectId } from 'mongoose';
import { Entity } from './user.entity';

/*** The `User` schema for database */
export interface ISchema extends Document<ObjectId | string>, IUser {
  readonly id?: ObjectId;
  readonly _id: Schema.Types.ObjectId;
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
    privateData: { type: Schema.Types.Mixed, of: PrivateDataSchema, required: false, default: {} },
    roles: {
      type: [String],
      enum: Object.values(ENUM.Roles),
      required: true,
      default: [ENUM.Roles.USER],
    },
    tokens: {
      emailVerification: {
        type: String,
        //  default: PasswordUtil.randomBytes()
        default: 'default',
      },
    },
    active: { type: Boolean, default: false },
    githubId: { type: String, required: false },
    redditId: { type: String, required: false },
    googleId: { type: String, required: false },
    avatar: { type: String, required: false },
  },
  {
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
  },
);
