import { IBaseData } from './base';
import { IUser } from './modules/user';

interface IJwtValidate {
  iat: Date;
  exp: Date;
  aud: string;
  iss: string;
  sub: IBaseData['id'];
}

/*** THe values should be in the jwt token.*/
export interface IJwtGenerateToken
  extends Required<Pick<IUser, 'email' | 'roles'>>,
    Required<Pick<IBaseData, 'id'>> {}
/*** The values in a jwt-token after token creation.*/
export interface IJwtValidateToken extends IJwtGenerateToken, IJwtValidate {}
