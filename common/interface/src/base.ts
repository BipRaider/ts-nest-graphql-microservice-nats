import { ObjectId } from 'mongoose';

/*** This is the basic data returned from the database.*/
export interface IBaseData {
  /**
   * The Mongoose ObjectId [SchemaType](/docs/schematypes.html). Used for
   * declaring paths in your schema that should be
   * [MongoDB ObjectIds](https://docs.mongodb.com/manual/reference/method/ObjectId/).
   * Do not use this to create a new ObjectId instance, use `mongoose.Types.ObjectId`
   * instead.
   */
  id: ObjectId;
  /**When the data is `created`.*/
  created: Date;
  /**When the data is `updated`.*/
  updated: Date;
}
