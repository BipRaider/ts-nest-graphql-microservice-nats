import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

import { NatsModule } from '@common/libs';
import { ENUM } from '@common/interface';
import { JwtUtilModule } from '@common/utils';

import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [] }),
    JwtUtilModule,
    CacheModule.register({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          store: redisStore,
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
          ttl: 120,
        };
      },
    }),
    NatsModule([
      {
        name: ENUM.NatsServicesName.CHAT,
        queue: ENUM.NatsServicesQueue.CHAT,
      },
    ]),
  ],
  providers: [ChatService, ChatResolver],
})
export class ChatModule {}
/*
 * Docs:
 * https://typegraphql.com/docs/subscriptions.html
 * https://docs.nestjs.com/graphql/subscriptions
 * https://www.delightfulengineering.com/blog/nest-websockets/rate-limiting-acknowledgements
 */
