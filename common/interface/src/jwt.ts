import { IBaseData } from './base';
import { IUser } from './user';

interface IJwtValidate {
  iat: Date;
  exp: Date;
  aud: string;
  iss: string;
  sub: IBaseData['id'];
}

export interface IJwtGenerateToken extends Required<Pick<IUser, 'email' | 'roles'>>, Required<Pick<IBaseData, 'id'>> {}
export interface IJwtValidateToken extends IJwtGenerateToken, IJwtValidate {}
