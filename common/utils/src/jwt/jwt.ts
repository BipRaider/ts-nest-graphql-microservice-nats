import { Injectable, Inject } from '@nestjs/common';
import { JwtService, JwtVerifyOptions, JwtSignOptions } from '@nestjs/jwt';
import { IJwtGenerateToken, IJwtValidateToken } from '@common/interface';
import { IJwtUtil } from './interface';
import { InjectJwtService } from './enum';

@Injectable()
export class JwtUtil implements IJwtUtil {
  /*** Name refresh token in the cookie */
  public refreshTokenName = 'refresh-token';

  constructor(
    @Inject(InjectJwtService.Refresh) private readonly jwtRefresh: JwtService,
    @Inject(InjectJwtService.Access) private readonly jwtAccess: JwtService,
    private readonly jwtService: JwtService,
  ) {}

  generateRefreshToken = async (payload: IJwtGenerateToken, context: any): Promise<boolean> => {
    const token = this.jwtRefresh.sign(
      { ...payload, iat: Math.floor(Date.now() / 1000) },
      { subject: String(payload.id || 'refresh') },
    );
    //Added to cookie refresh token.
    context.res.cookie(this.refreshTokenName, token, {
      httpOnly: true,
      secure: false, // process.env.NODE_ENV === production,
      maxAge: 1.728e8,
    });
    return true;
  };

  generateAccessToken = async (payload: IJwtGenerateToken) => {
    const access_token = this.jwtAccess.sign(
      { ...payload, iat: Math.floor(Date.now() / 1000) },
      { subject: String(payload.id || 'access') },
    );
    return access_token;
  };

  //TODO: remove any
  generateToken = (payload: any): string => {
    const token = this.jwtService.sign(
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
