import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ENUM } from '@common/interface';

import { ROLES_KEY, ROLE_KEY } from '../decorator';

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

    if (!requiredRoles.length) return false;

    return requiredRoles.some(role => user?.roles?.includes(role));
  }
}

/*** Check a `roles` from access_token */
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getNext().req;
    const role = this.reflector.getAllAndOverride<ENUM.Roles>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!role) return false;

    return user?.roles?.includes(role);
  }
}
