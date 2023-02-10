import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MongoConnect, NatsModule, NatsProvider } from '@common/libs';
import { ENUM } from '@common/interface';

import { ExchequerController } from './exchequer.controller';
import { ExchequerService } from './exchequer.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongoConnect(ENUM.MongoCollectionNames.EXCHEQUER),
    // MongoCollection(
    //   [
    //     {
    //       name: ENUM.MongoSchemaNames.EXCHEQUER,
    //       schema: exchequerSchema,
    //     },
    //   ],
    //   ENUM.MongoCollectionNames.EXCHEQUER,
    // ),

    NatsModule([
      {
        name: ENUM.NatsServicesName.API,
        queue: ENUM.NatsServicesQueue.API,
      },
      {
        name: ENUM.NatsServicesName.ADMIN,
        queue: ENUM.NatsServicesQueue.ADMIN,
      },
      {
        name: ENUM.NatsServicesName.PRODUCT,
        queue: ENUM.NatsServicesQueue.PRODUCT,
      },
      {
        name: ENUM.NatsServicesName.ORDER,
        queue: ENUM.NatsServicesQueue.ORDER,
      },
    ]),
  ],
  controllers: [ExchequerController],
  providers: [
    ExchequerService,
    NatsProvider({
      provide: ENUM.NatsServicesName.EXCHEQUER,
      queue: ENUM.NatsServicesQueue.EXCHEQUER,
    }),
  ],
})
export class ExchequerModule {}
