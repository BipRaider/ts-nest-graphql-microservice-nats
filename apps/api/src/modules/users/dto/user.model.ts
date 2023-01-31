import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

import { IBaseData, IPrivateData, IUser, Roles } from '@common/interface';

import { BaseModel } from '../../base.model';

registerEnumType(Roles, {
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

  @Field(type => [Roles], { nullable: true })
  roles?: Roles[];

  @Field(type => PrivateData, { nullable: true })
  privateData?: PrivateData;
}
