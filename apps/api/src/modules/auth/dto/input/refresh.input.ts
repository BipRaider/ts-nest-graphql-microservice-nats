import { ObjectType, PickType } from '@nestjs/graphql';

import { IJwtGenerateToken } from '@common/interface';
import { Auth } from '../auth.model';

@ObjectType()
export class RefreshTokenResponse
  extends PickType(Auth, ['email', 'roles', 'id', 'access_token'] as const)
  implements Partial<IJwtGenerateToken> {}
