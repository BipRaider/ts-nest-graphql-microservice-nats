import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';

import { JwtUtil } from '@common/utils';
import { IJwtValidateToken } from '@common/interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwt: JwtUtil) {} //

  async use(req: Request & { user: IJwtValidateToken; ip: string }, res: Response, next: NextFunction): Promise<void> {
    const { authorization } = req.headers;

    let user: IJwtValidateToken;

    if (authorization && typeof authorization === 'string') {
      const token = authorization.split(' ')[1];
      user = await this.jwt.verifyAccess(token);
      if (!token) return next();
    }

    req.user = user;

    return next();
  }
}
