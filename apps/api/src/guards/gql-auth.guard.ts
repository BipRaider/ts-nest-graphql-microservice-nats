import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

import { JwtStrategyName } from '@common/utils';

/*** Validation by `access_token` then add to the `Request a user` and return the data next guard.*/
@Injectable()
export class GqlAuthGuard extends AuthGuard(JwtStrategyName.Gql) {
  getRequest(context: ExecutionContext): any {
    const ctx = GqlExecutionContext.create(context);
    const connectionParams = ctx.getContext()?.connectionParams;
    const extra = ctx.getContext()?.extra;
    return { extra, connectionParams };
  }

  // handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
  //   return user;
  // }
}
