import { Injectable, Inject } from '@nestjs/common';
import { JwtService, JwtVerifyOptions, JwtSignOptions } from '@nestjs/jwt';

import { IJwtGenerateToken, IJwtValidateToken } from '@common/interface';
import { IJwtUtil } from './interface';
import { InjectJwtService } from './enum';

@Injectable()
export class JwtUtil implements IJwtUtil {
  /*** Name refresh token in the cookie */
  public refreshTokenName = 'refresh-token';
  /*** Name access token in the cookie */
  public accessTokenName = 'access-token';
  constructor(
    @Inject(InjectJwtService.Refresh) private readonly jwtRefresh: JwtService,
    @Inject(InjectJwtService.Access) private readonly jwtAccess: JwtService,
    private readonly jwtService: JwtService,
  ) {}

  generateRefreshToken = async (payload: IJwtGenerateToken, context: any): Promise<string> => {
    const token = await this.jwtRefresh.signAsync(
      { ...payload, iat: Math.floor(Date.now() / 1000) },
      { subject: String(payload.id || 'refresh') },
    );
    //Added to cookie refresh token.
    context.res.cookie(this.refreshTokenName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1.728e8,
    });

    return token;
  };

  generateAccessToken = async (payload: IJwtGenerateToken, context: any): Promise<string> => {
    const token = await this.jwtAccess.signAsync(
      { ...payload, iat: Math.floor(Date.now() / 1000) },
      { subject: String(payload.id || 'access') },
    );
    //Added to cookie access token.
    context.res.cookie(this.accessTokenName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1.8e6,
    });

    return token;
  };

  generateToken = async (payload: any): Promise<string> => {
    const token = await this.jwtService.signAsync(
      { ...payload, iat: Math.floor(Date.now() / 1000) },
      { subject: String(payload.id) || 'jwt' },
    );
    return token;
  };

  public verify = async <T extends object>(
    token: string,
    options?: JwtVerifyOptions | JwtSignOptions,
  ): Promise<T | null> => {
    return await new Promise(res => {
      try {
        // res(this.jwtService.verifyAsync(token, options));
        res(this.jwtService.verify(token, options));
      } catch {
        res(null);
      }
    });
  };
  //It is work like strategy
  public verifyRefresh = async (token: string): Promise<IJwtValidateToken | null> => {
    return await new Promise(res => {
      try {
        res(this.jwtRefresh.verify(token));
      } catch {
        res(null);
      }
    });
  };
  //It is work like strategy
  public verifyAccess = async (token: string): Promise<IJwtValidateToken | null> => {
    return await new Promise(res => {
      try {
        res(this.jwtAccess.verify(token));
      } catch {
        res(null);
      }
    });
  };
}
