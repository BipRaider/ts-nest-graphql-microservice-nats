import { InputType, Field, ObjectType, OmitType, Int } from '@nestjs/graphql';
import { IsInt, Min, IsOptional } from 'class-validator';

import { User } from '../user.model';
import { UserContract } from '@common/contracts';

@InputType()
export class GetUsersInput implements UserContract.GetUsersQuery.Request {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt({ message: 'The skip is incorrect' })
  @Min(0, { message: 'The skip is incorrect' })
  skip: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt({ message: 'The limit is incorrect' })
  @Min(0, { message: 'The limit is incorrect' })
  limit: number;
}

@ObjectType()
export class GetUsersResponse
  extends OmitType(User, ['password'] as const)
  implements Partial<UserContract.GetUsersQuery.Response> {}
