import { Field, ObjectType } from '@nestjs/graphql';

import { IBaseData, IUser } from '@common/interface';

import { User } from '../../users/dto/user.model';

@ObjectType()
export class Auth extends User implements IUser, IBaseData {
  @Field(() => String, { nullable: true })
  access_token?: string;
}
