import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  //constructor(private authService: AuthService) {} //

  async use(req: Request & { user: string; ip: string }, res: Response, next: NextFunction) {
    const token = req;
    console.dir(token.cookies);
    if (!token) {
      return next();
    }

    // const refreshToken = await this.authService.getSession({ token });
    // req.user = get(refreshToken, 'user', null);

    return next();
  }
}
