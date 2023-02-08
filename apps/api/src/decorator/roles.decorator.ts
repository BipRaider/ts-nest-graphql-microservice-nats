import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { ENUM } from '@common/interface';

export const ROLES_KEY = 'roles';
export const Roles = (roles: ENUM.Roles[]): CustomDecorator<string> => {
  return SetMetadata(ROLES_KEY, roles);
};

export const ROLE_KEY = 'role';
export const Role = (role: ENUM.Roles): CustomDecorator<string> => {
  return SetMetadata(ROLE_KEY, role);
};
