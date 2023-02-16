import { Inject, Injectable } from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';

import { ENUM } from '@common/interface';
import { OrderContract } from '@common/contracts';
import { ErrorUtil, SendErrorUtil } from '@common/utils';

@Injectable()
export class ChatService {
  constructor(@Inject(ENUM.NatsServicesName.CHAT) private readonly chatClient: ClientNats) {}

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
}
