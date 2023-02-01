import { Module } from '@nestjs/common';

import { NatsModule } from '@common/libs';
import { JwtUtilModule, PasswordModule } from '@common/utils';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';
import { GuardsModule } from '../../guards/guards.module';

@Module({
  imports: [
    UsersModule,
    PasswordModule,
    JwtUtilModule,
    NatsModule([
      {
        name: 'USER_SERVICE',
        queue: 'user',
      },
    ]),
  ],
  providers: [GuardsModule, AuthResolver, AuthService, JwtUtilModule],
  exports: [AuthService],
})
export class AuthModule {}
