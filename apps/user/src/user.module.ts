import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NatsProvider, NatsModule, MongoCollection, MongoConnect } from '@common/libs';
import { PasswordModule } from '@common/utils';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './user.schema';
import { UsersRepository } from './user.repository';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PasswordModule,
    MongoConnect('users'),
    MongoCollection([{ name: 'User', schema: UserSchema }], 'users'),
    NatsModule([
      {
        name: 'API_SERVICE',
        queue: 'api',
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UsersRepository, UserService, NatsProvider({ provide: 'USER_SERVICE', queue: 'user' })],
})
export class UserModule {}
