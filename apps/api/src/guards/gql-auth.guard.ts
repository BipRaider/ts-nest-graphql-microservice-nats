import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

import { JwtStrategyName } from '@common/utils';

/*** Validation by `access_token` then add to the `Request a user` and return the data next guard.*/
@Injectable()
export class GqlAuthGuard extends AuthGuard(JwtStrategyName.Gql) {
  getRequest(context: ExecutionContext): any {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    // console.log('GqlAuthGuard--1-step-->');
    return req;
  }
}
