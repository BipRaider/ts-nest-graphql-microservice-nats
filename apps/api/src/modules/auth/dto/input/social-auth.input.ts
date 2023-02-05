import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class SocialAuthInput {
  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString({ message: 'The code is incorrect' })
  code: string;
}
