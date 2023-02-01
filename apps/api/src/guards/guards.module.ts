import { Module } from '@nestjs/common';

import { RefreshAuthGuard } from './refresh-auth.guard';
import { AccessAuthGuard } from './access-auth.guard';
import { GqlAuthGuard } from './gql-auth.guard';
import { RolesGuard } from './roles.guard';
/*** List guards.*/
@Module({
  exports: [GqlAuthGuard, RolesGuard, RefreshAuthGuard, AccessAuthGuard],
  providers: [GqlAuthGuard, RolesGuard, RefreshAuthGuard, AccessAuthGuard],
})
export class GuardsModule {}
