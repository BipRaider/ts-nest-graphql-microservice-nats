import { Module } from '@nestjs/common';
import { GqlStrategy } from './gql.strategy';
import { JwtRefreshStrategy } from './refresh.strategy';

@Module({
  exports: [GqlStrategy, JwtRefreshStrategy],
  providers: [GqlStrategy, JwtRefreshStrategy],
})
export class StrategyModule {}
