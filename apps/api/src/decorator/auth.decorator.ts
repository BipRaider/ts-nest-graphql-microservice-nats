import { applyDecorators, UseGuards } from '@nestjs/common';

import { ENUM } from '@common/interface';

import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { AccessAuthGuard } from '../guards/access-auth.guard';
import { Role } from './roles.decorator';

export function AuthRole(roles: ENUM.Roles) {
  return applyDecorators(UseGuards(GqlAuthGuard, RolesGuard), Role(roles));
}

export function Auth() {
  return applyDecorators(UseGuards(AccessAuthGuard));
}
