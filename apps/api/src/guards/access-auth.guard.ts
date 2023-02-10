import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

import { JwtStrategyName } from '@common/utils';

/*** Validation by `access_token` then add  to the Request a user. */
@Injectable()
export class AccessAuthGuard extends AuthGuard(JwtStrategyName.Access) {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    // console.log('AccessAuthGuard--1-step-->');
    return req;
  }
}
