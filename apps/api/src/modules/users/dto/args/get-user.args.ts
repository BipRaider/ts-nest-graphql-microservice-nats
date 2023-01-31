import 'reflect-metadata';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsMongoId, IsEmail } from 'class-validator';
import { Schema, ObjectId } from 'mongoose';

@ArgsType()
export class GetUserById {
  @Field(() => Schema.Types.ObjectId)
  @IsNotEmpty()
  @IsMongoId({ message: 'The Id is incorrect' })
  id: ObjectId;
}

@ArgsType()
export class GetUserByEmail {
  @Field(() => String)
  @IsNotEmpty()
  @IsEmail({}, { message: 'The email is incorrect' })
  email: string;
}
