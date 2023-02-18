import { Resolver, Subscription, Args, Mutation, Context } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { ENUM, IJwtGenerateToken, IPayloadNewMessage } from '@common/interface';

import { AuthGqlSub, AuthRoles, CurrentUser } from '../../decorator';
import { Message } from './dto/chat.model';
import { SendMessageManyToOneInput, SendMessageOneToOneInput } from './dto/input';
import { ChatService } from './chat.service';

@Resolver()
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Mutation(() => Boolean)
  @AuthRoles([ENUM.Roles.USER])
  async sendMessageOneToOne(
    @Args('input') input: SendMessageOneToOneInput,
    @CurrentUser() user: IJwtGenerateToken,
  ): Promise<boolean> {
    await this.chatService.OneToOne({ input, user });
    return true;
  }

  @Mutation(() => Boolean)
  @AuthRoles([ENUM.Roles.USER])
  async sendMessageOneToMany(
    @Args('input') input: SendMessageManyToOneInput,
    @CurrentUser() user: IJwtGenerateToken,
  ): Promise<boolean> {
    await this.chatService.OneToMay({ input, user });
    return true;
  }

  //Subscription functions
  @Subscription(() => Message, {
    name: ENUM.ChatSubscription.OneToOne,
    filter: (payload: IPayloadNewMessage, _variables, context) => {
      let user: IJwtGenerateToken;
      const { extra } = context;
      if (extra.user) user = extra.user;
      if (user?.id === payload.userTo || user?.id === payload.userFrom) return true;
      return false;
    },
    resolve: payload => payload['body'],
  })
  @AuthGqlSub()
  async getMessageOneToOne(@Context('pubSub') pubSub: RedisPubSub) {
    return pubSub.asyncIterator([ENUM.ChatSubscription.OneToOne]);
  }

  @Subscription(() => Message, {
    name: ENUM.ChatSubscription.ManyToOne,
    resolve: payload => payload['body'],
  })
  async getMessageManyToOne(@Context('pubSub') pubSub: RedisPubSub) {
    return pubSub.asyncIterator([ENUM.ChatSubscription.ManyToOne]);
  }
}
