/*
 * Docs:
 * https://typegraphql.com/docs/subscriptions.html
 * https://docs.nestjs.com/graphql/subscriptions
 */
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Resolver, Subscription, Args, Mutation, Query } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Cache } from 'cache-manager';

import { PUB_SUB } from '@common/libs';
import { ENUM, IJwtGenerateToken } from '@common/interface';

import { Message } from './chat.schema';
import { SendMessageInput } from './dto/input/chat.input';
import { AuthGqlSub, AuthRole, AuthRoles, CurrentUser } from '../../decorator';

const getMessageOneToOne = 'getMessageOneToOne';
const getMessageMenyToOne = 'getMessageMenyToOne';

export interface IPaylodaNewMessage {
  body: {
    message: string;
    sent: Date;
  };
  userFrom: IJwtGenerateToken['id'];
  userTo: IJwtGenerateToken['id'];
}

@Resolver()
export class ChatResolver {
  constructor(
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Mutation(() => Message)
  @AuthRoles([ENUM.Roles.USER])
  async sendMessageOneToOne(
    @Args('input') input: SendMessageInput,
    @CurrentUser() user: IJwtGenerateToken,
  ) {
    const body = { sent: new Date(), message: input.message };

    await this.pubSub.publish<IPaylodaNewMessage>(getMessageOneToOne, {
      body,
      userFrom: user.id,
      userTo: input.userId,
    });
    return body;
  }

  @Mutation(() => Message)
  @AuthRoles([ENUM.Roles.USER])
  async sendMessageOneToMeny(
    @Args('input') input: SendMessageInput,
    @CurrentUser() user: IJwtGenerateToken,
  ) {
    const body = { sent: new Date(), message: input.message };

    await this.pubSub.publish<IPaylodaNewMessage>(getMessageMenyToOne, {
      body,
      userFrom: user.id,
      userTo: input.userId,
    });
    return body;
  }

  //Subscription functions
  @Subscription(() => Message, {
    name: getMessageOneToOne,
    filter(this: ChatResolver, payload: IPaylodaNewMessage, _variables, context) {
      let user: IJwtGenerateToken;
      const { extra } = context;
      if (extra.user) user = extra.user;
      if (user.id === payload.userTo || user.id === payload.userFrom) return true;
      return false;
    },
    resolve: payload => payload['body'],
  })
  @AuthGqlSub()
  async getMessageOneToOne() {
    return this.pubSub.asyncIterator(getMessageOneToOne);
  }

  @Subscription(() => Message, {
    name: getMessageMenyToOne,
    resolve: payload => payload['body'],
  })
  async getMessageMenyToOne() {
    return this.pubSub.asyncIterator(getMessageMenyToOne);
  }
}
