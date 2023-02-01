import { applyDecorators, UseGuards } from '@nestjs/common';

import { Roles } from '@common/interface';

import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Role } from './roles.decorator';
import { AccessAuthGuard } from '../guards/access-auth.guard';

export function AuthRole(roles: Roles) {
  return applyDecorators(UseGuards(GqlAuthGuard, RolesGuard), Role(roles));
}

export function Auth() {
  return applyDecorators(UseGuards(AccessAuthGuard));
}
