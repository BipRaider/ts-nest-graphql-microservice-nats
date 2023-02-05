import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

import { IBaseData, IPrivateData, IUser, ENUM } from '@common/interface';

import { BaseModel } from '../../base.model';

registerEnumType(ENUM.Roles, {
  name: 'Roles',
  description: 'Roles for Admin creating projects and users',
});

@ObjectType()
export class PrivateData implements IPrivateData {
  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;
}

@ObjectType()
export class User extends BaseModel implements IUser, IBaseData {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  password: string;

  @Field(type => [ENUM.Roles], { nullable: true })
  roles?: ENUM.Roles[];

  @Field(type => PrivateData, { nullable: true })
  privateData?: PrivateData;
}
