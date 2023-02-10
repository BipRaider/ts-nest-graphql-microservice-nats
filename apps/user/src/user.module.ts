import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { NatsProvider, NatsModule, MongoCollection, MongoConnect } from '@common/libs';
import { PasswordModule } from '@common/utils';
import { ENUM } from '@common/interface';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './user.schema';
import { UsersRepository } from './user.repository';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PasswordModule,

    MongoConnect(ENUM.MongoCollectionNames.USER),
    MongoCollection(
      [
        {
          name: ENUM.MongoSchemaNames.USER,
          schema: UserSchema,
        },
      ],
      ENUM.MongoCollectionNames.USER,
    ),

    NatsModule([
      {
        name: ENUM.NatsServicesName.API,
        queue: ENUM.NatsServicesQueue.API,
      },
      {
        name: ENUM.NatsServicesName.ORDER,
        queue: ENUM.NatsServicesQueue.ORDER,
      },
      {
        name: ENUM.NatsServicesName.EMAIL,
        queue: ENUM.NatsServicesQueue.EMAIL,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    UsersRepository,
    UserService,
    NatsProvider({
      provide: ENUM.NatsServicesName.USER,
      queue: ENUM.NatsServicesQueue.USER,
    }),
  ],
})
export class UserModule {}
