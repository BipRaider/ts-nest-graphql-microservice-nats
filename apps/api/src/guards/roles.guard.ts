import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ENUM } from '@common/interface';

import { ROLES_KEY } from '../decorator';

/*** Check a `roles` from access_token */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getNext().req;
    const requiredRoles = this.reflector.getAllAndOverride<ENUM.Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    return requiredRoles.some(role => user?.roles?.includes(role));
  }
}
