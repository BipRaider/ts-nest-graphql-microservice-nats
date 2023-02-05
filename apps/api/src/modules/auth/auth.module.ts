import { Module } from '@nestjs/common';

import { ENUM } from '@common/interface';
import { NatsModule } from '@common/libs';
import { JwtUtilModule } from '@common/utils';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

import { GuardsModule } from '../../guards/guards.module';

@Module({
  imports: [
    JwtUtilModule,
    NatsModule([
      {
        name: ENUM.NatsServicesName.USER,
        queue: ENUM.NatsServicesQueue.USER,
      },
    ]),
  ],
  providers: [GuardsModule, AuthResolver, AuthService, JwtUtilModule],
  exports: [AuthService],
})
export class AuthModule {}
