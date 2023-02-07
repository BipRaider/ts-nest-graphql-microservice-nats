import { Module } from '@nestjs/common';

import { NatsModule } from '@common/libs';
import { ENUM } from '@common/interface';
import { PasswordModule } from '@common/utils';

import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [
    PasswordModule,
    NatsModule([
      {
        name: ENUM.NatsServicesName.USER,
        queue: ENUM.NatsServicesQueue.USER,
      },
    ]),
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
