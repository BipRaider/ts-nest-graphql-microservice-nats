import { InputType, Field, ObjectType, OmitType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

import { AuthContract } from '@common/contracts';
import { Auth } from '../auth.model';

@InputType()
export class LoginUserInput implements AuthContract.AuthQuery.Request {
  @Field(() => String)
  @IsNotEmpty()
  @IsString({ message: 'The password is incorrect' })
  password: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsEmail({}, { message: 'The email is incorrect' })
  email: string;
}

@ObjectType()
export class LoginUserResponse
  extends OmitType(Auth, ['password'] as const)
  implements Partial<AuthContract.AuthQuery.Response & { access_token: string }>
{
  @Field(() => String)
  access_token: string;
}
