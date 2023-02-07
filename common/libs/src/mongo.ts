import { DynamicModule, Logger } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

const logger = new Logger('MongoDB');

/*** Connecting to the mongodb database.
 ** Looking in `process.env` name `MONGO_URl` and joined at this url
 ** Has default connect url `mongodb://localhost:27017`
 * @param collectionName The name of the collection in the database.
 */
export type MongoConnect = (collectionName?: string) => DynamicModule;
export const MongoConnect: MongoConnect = (collectionName?: string): DynamicModule => {
  const url = process.env.MONGO_URL ? process.env.MONGO_URL : 'mongodb://localhost:27017';
  logger.log(`Connect to: ${url}`);
  return MongooseModule.forRoot(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    connectionName: collectionName,
  });
};
/*** Connecting to a collections list.
 * @param data Expects a list of schemas.
 * @param collectionName The name of the collection in the database.
 */
export type MongoCollection = (data: ModelDefinition[], collectionName?: string) => DynamicModule;
export const MongoCollection: MongoCollection = (
  data: ModelDefinition[],
  collectionName?: string,
): DynamicModule => {
  logger.log(`Collection: ${collectionName}`);
  return MongooseModule.forFeature(data, collectionName);
};
