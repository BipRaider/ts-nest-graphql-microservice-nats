import { InputType, Field } from '@nestjs/graphql';
import { Schema, ObjectId } from 'mongoose';

@InputType()
export class MessageSentInput {
  @Field()
  clientId: string;
}

@InputType()
export class SendMessageInput {
  @Field({ nullable: false })
  message: string;

  @Field(() => Schema.Types.ObjectId, { nullable: false })
  userId: ObjectId;
}
