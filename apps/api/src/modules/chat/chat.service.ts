import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';
import { Cache } from 'cache-manager';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { ENUM, IJwtGenerateToken, IPayloadNewMessage } from '@common/interface';
import { PUB_SUB } from '@common/libs';
import { OrderContract } from '@common/contracts';
import { ErrorUtil, SendErrorUtil } from '@common/utils';

import { SendMessageOneToOneInput, SendMessageManyToOneInput } from './dto/input';

export type TOneToOne<T> = {
  input: T;
  user: IJwtGenerateToken;
};

@Injectable()
export class ChatService {
  constructor(
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
    @Inject(ENUM.NatsServicesName.CHAT) private readonly chatClient: ClientNats,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  public create = async (
    data: OrderContract.CreateCommand.Payload,
  ): Promise<OrderContract.CreateCommand.Response | SendErrorUtil> => {
    const record = OrderContract.CreateCommand.build(data);

    const payload: OrderContract.CreateCommand.Response | SendErrorUtil = await new Promise(
      async res => {
        const response = this.chatClient.send<
          OrderContract.CreateCommand.Response,
          OrderContract.CreateCommand.Record
        >(OrderContract.CreateCommand.Pattern, record);

        response.subscribe({
          next: async data => res(data),
          error: err => res(new ErrorUtil(502).send({ error: err.message, payload: err })),
        });
      },
    );

    return payload;
  };

  public OneToOne = async ({ input, user }: TOneToOne<SendMessageOneToOneInput>): Promise<void> => {
    const body = { sent: new Date(), message: input.message };

    await this.pubSub.publish<IPayloadNewMessage>(ENUM.ChatSubscription.OneToOne, {
      body,
      userFrom: user.id,
      userTo: input.userId,
    });

    return;
  };

  public OneToMay = async ({
    input,
    user,
  }: Pick<TOneToOne<SendMessageManyToOneInput>, 'input' | 'user'>): Promise<void> => {
    const body = { sent: new Date(), message: input.message };

    await this.pubSub.publish<IPayloadNewMessage>(ENUM.ChatSubscription.ManyToOne, {
      body,
      userFrom: user.id,
    });

    return;
  };
}
