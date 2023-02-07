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
  public readonly firstname?: string;

  @Field({ nullable: true })
  public readonly lastname?: string;
}

@ObjectType()
export class User extends BaseModel implements IUser, IBaseData {
  @Field(() => String, { nullable: true })
  public readonly name: string;

  @Field(() => String, { nullable: true })
  public readonly email: string;

  @Field(() => String, { nullable: true })
  public readonly password: string;

  @Field(type => [ENUM.Roles], { nullable: true })
  public readonly roles?: ENUM.Roles[];

  @Field(type => PrivateData, { nullable: true })
  public readonly privateData?: PrivateData;
}
