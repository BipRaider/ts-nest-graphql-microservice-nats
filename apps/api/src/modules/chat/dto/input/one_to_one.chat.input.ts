import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsMongoId, IsString, IsOptional, Length } from 'class-validator';
import { Schema, ObjectId } from 'mongoose';

@InputType()
export class SendMessageOneToOneInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString({ message: 'The message is incorrect' })
  @Length(1, 300)
  message: string;

  @Field(() => Schema.Types.ObjectId)
  @IsOptional()
  @IsMongoId({ message: 'The Id is incorrect' })
  userId: ObjectId;
}
