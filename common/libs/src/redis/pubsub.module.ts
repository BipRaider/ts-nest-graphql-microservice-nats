import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';

export const PUB_SUB = 'PUB_SUB';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PUB_SUB,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return new RedisPubSub({
          publisher: new Redis(configService.get('REDIS_HOST')),
          subscriber: new Redis(configService.get('REDIS_HOST')),
        });
      },
    },
  ],
  exports: [PUB_SUB],
})
export class PubSubModule {}
