import { Module } from '@nestjs/common';

import { NatsModule } from '@common/libs';
import { PasswordModule } from '@common/utils';

import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [
    PasswordModule,
    NatsModule([
      {
        name: 'USER_SERVICE',
        queue: 'user',
      },
    ]),
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
