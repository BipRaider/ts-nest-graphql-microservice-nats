import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

/*** Cleared password from response.*/
export const clearPassword: FieldMiddleware = async (ctx: MiddlewareContext, next: NextFn) => {
  const { info } = ctx;
  if (info.fieldName === 'password') return;
  return next();
};

//TODO: Need to rename func and update the logic.
export const checkRoleMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  //const { extensions } = info.parentType.getFields()[info.fieldName];

  return next();
};
