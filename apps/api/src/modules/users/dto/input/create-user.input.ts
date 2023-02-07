import { InputType, Field, ObjectType, PartialType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsOptional, IsString, Length, ValidateNested } from 'class-validator';

import { UserContract } from '@common/contracts';

import { PrivateDataInput } from './private-data.input';
import { BaseModel } from '../../../base.model';

@InputType()
export class CreateUserInput implements UserContract.CreateCommand.Request {
  @Field(() => String)
  @IsNotEmpty()
  @IsString({ message: 'The name is incorrect' })
  @Length(6, 15)
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsEmail({}, { message: 'The email is incorrect' })
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString({ message: 'The password is incorrect' })
  @Length(10, 55)
  password: string;

  @Field(() => PrivateDataInput, { nullable: true })
  @IsOptional()
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => PrivateDataInput)
  privateData?: PrivateDataInput;
}

@ObjectType()
export class CreateUserResponse
  extends PartialType(BaseModel)
  implements Partial<UserContract.CreateCommand.Response> {}
