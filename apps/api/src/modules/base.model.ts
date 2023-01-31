import { IBaseData } from '@common/interface';
import {
  Field,
  ObjectType,
  //  GraphQLISODateTime
} from '@nestjs/graphql';
import { Schema, ObjectId } from 'mongoose';

@ObjectType()
export class BaseModel implements IBaseData {
  @Field(() => Schema.Types.ObjectId, { nullable: true })
  public id: ObjectId;

  @Field(() => Date, { nullable: true })
  public created: Date;

  @Field(() => Date, { nullable: true })
  public updated: Date;
}
