import { IJwtGenerateToken, IJwtValidateToken } from '@common/interface';
import { JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';

export interface IJwtUtil {
  generateRefreshToken: (payload: IJwtGenerateToken, context: any) => Promise<string>;
  generateAccessToken: (payload: IJwtGenerateToken, context: any) => Promise<string>;
  generateToken: (payload: any) => Promise<string>;
  verifyRefresh: (token: string) => Promise<IJwtValidateToken | null>;
  verifyAccess: (token: string) => Promise<IJwtValidateToken | null>;
  verify: <T extends object>(token: string, options?: JwtVerifyOptions | JwtSignOptions) => Promise<T | null>;
}
