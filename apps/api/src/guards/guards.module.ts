import { Module } from '@nestjs/common';

import { GqlAuthGuard } from './gql-auth.guard';
import { RolesGuard } from './roles.guard';
import { RefreshAuthGuard } from './refresh-auth.guard';

@Module({
  exports: [GqlAuthGuard, GqlAuthGuard, RefreshAuthGuard],
  providers: [RolesGuard, RolesGuard, RefreshAuthGuard],
})
export class GuardsModule {}
