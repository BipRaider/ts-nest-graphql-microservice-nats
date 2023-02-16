import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { IJwtGenerateToken, IJwtValidateToken } from '@common/interface';

/*** Return the data from `req.user` */
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): IJwtGenerateToken => {
    const ctx = GqlExecutionContext.create(context);
    const { id, roles, email }: IJwtValidateToken = ctx.getContext().req?.user;
    return { id, roles, email };
  },
);

/*** Return the data from `extra.user`. When use `Subscription`.*/
export const CurrentUserGqlSub = createParamDecorator(
  (data: unknown, context: ExecutionContext): IJwtGenerateToken => {
    const ctx = GqlExecutionContext.create(context);
    const { id, roles, email }: IJwtValidateToken = ctx.getContext()?.extra?.user;
    return { id, roles, email };
  },
);
