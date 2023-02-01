import { applyDecorators, UseGuards } from '@nestjs/common';

import { Roles } from '@common/interface';

import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Role } from './roles.decorator';

export function Auth(roles: Roles) {
  return applyDecorators(UseGuards(GqlAuthGuard, RolesGuard), Role(roles));
}
