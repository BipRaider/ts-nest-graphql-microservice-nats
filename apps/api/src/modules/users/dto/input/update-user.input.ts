import { InputType, Field, ObjectType, OmitType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { IsOptional, IsNotEmptyObject, ValidateNested, IsString, Length } from 'class-validator';

import { UserContract } from '@common/contracts';

import { User } from '../user.model';
import { PrivateDataInput } from './private-data.input';

@InputType()
export class UpdateUserInput implements UserContract.UpdateCommand.Request {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'The name is incorrect' })
  @Length(6, 15)
  name?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'The password is incorrect' })
  @Length(10, 55)
  password?: string;

  @Field(() => PrivateDataInput, { nullable: true })
  @IsOptional()
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => PrivateDataInput)
  privateData?: PrivateDataInput;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'The password is incorrect' })
  avatar?: string;
}

@ObjectType()
export class UpdateUserResponse
  extends OmitType(User, ['password'] as const)
  implements Partial<UserContract.UpdateCommand.Response> {}
