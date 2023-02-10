import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

import { JwtStrategyName } from '@common/utils';

/*** Validation by `refresh-token`  then add  to the Request a user.*/
@Injectable()
export class RefreshAuthGuard extends AuthGuard(JwtStrategyName.Refresh) {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    // console.log('RefreshAuthGuard--1-step-->');
    return req;
  }
}
