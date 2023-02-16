import { applyDecorators, UseGuards } from '@nestjs/common';

import { ENUM } from '@common/interface';

import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { RolesGuard, RoleGuard } from '../guards/roles.guard';
import { AccessAuthGuard } from '../guards/access-auth.guard';
import { Roles, Role } from './roles.decorator';

export function AuthRoles(roles: ENUM.Roles[]) {
  return applyDecorators(UseGuards(AccessAuthGuard, RolesGuard), Roles(roles));
}
export function AuthRole(role: ENUM.Roles) {
  return applyDecorators(UseGuards(AccessAuthGuard, RoleGuard), Role(role));
}

export function AuthGqlSub() {
  return applyDecorators(UseGuards(GqlAuthGuard));
}

export function Auth() {
  return applyDecorators(UseGuards(AccessAuthGuard));
}
