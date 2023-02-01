import { IJwtGenerateToken, IJwtValidateToken } from '@common/interface';
import { JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';

export interface IJwtUtil {
  generateRefreshToken: (payload: IJwtGenerateToken, context: any) => Promise<boolean>;
  generateAccessToken: (payload: IJwtGenerateToken) => Promise<string>;
  generateToken: (payload: any) => string;
  verify: <T extends object>(token: string, options?: JwtVerifyOptions | JwtSignOptions) => Promise<T | null>;
  verifyRefresh: (token: string) => Promise<IJwtValidateToken | null>;
  verifyAccess: (token: string) => Promise<IJwtValidateToken | null>;
}
