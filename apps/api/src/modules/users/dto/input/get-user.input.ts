import { InputType, Field, ObjectType, OmitType } from '@nestjs/graphql';
import { IsNotEmpty, IsMongoId, IsEmail, ValidateIf, IsOptional } from 'class-validator';
import { Schema, ObjectId } from 'mongoose';
import { User } from '../user.model';
import { UserContract } from '@common/contracts';

@InputType()
export class GetUserInput implements UserContract.GetUserQuery.Request {
  @Field(() => Schema.Types.ObjectId, { nullable: true })
  @IsOptional()
  @IsMongoId({ message: 'The Id is incorrect' })
  id?: ObjectId;

  @Field(() => String, { nullable: true })
  @ValidateIf(prop => {
    return prop.id ? false : true;
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'The email is incorrect' })
  email?: string;
}

@ObjectType()
export class GetUserResponse
  extends OmitType(User, ['password'] as const)
  implements Partial<UserContract.GetUserQuery.Response> {}
