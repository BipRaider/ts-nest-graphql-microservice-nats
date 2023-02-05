import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { ENUM } from '@common/interface';

export const ROLES_KEY = 'roles';
export const Role = (...roles: ENUM.Roles[]): CustomDecorator<string> => {
  return SetMetadata(ROLES_KEY, roles);
};
