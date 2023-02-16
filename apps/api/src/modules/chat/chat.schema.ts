import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field(() => String, { nullable: false })
  @Field({ nullable: false })
  readonly message: string;

  @Field(() => String, { nullable: false })
  readonly sent: string;
}
