import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class SendMessageManyToOneInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString({ message: 'The message is incorrect' })
  @Length(1, 300)
  message: string;
}
