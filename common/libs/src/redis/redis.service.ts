import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { envConfig } from '@common/config';
@Injectable()
export class RedisService {
  private _redisClient: Redis;
  constructor() {
    const { redis, defPort, server } = envConfig();
    // // Setup session with redis
    if (server.port !== defPort) {
      this._redisClient = new Redis(redis.host);
    } else {
      this._redisClient = new Redis();
    }
  }
  get client(): Redis {
    return this._redisClient;
  }
}
