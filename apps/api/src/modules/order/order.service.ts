import { Inject, Injectable } from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';

import { ENUM } from '@common/interface';
import { OrderContract } from '@common/contracts';
import { ErrorUtil, SendErrorUtil } from '@common/utils';
import { PaidOrderInput } from './dto/input';

@Injectable()
export class OrderService {
  constructor(@Inject(ENUM.NatsServicesName.ORDER) private readonly orderClient: ClientNats) {}

  public create = async (
    data: OrderContract.CreateCommand.Payload,
  ): Promise<OrderContract.CreateCommand.Response | SendErrorUtil> => {
    const record = OrderContract.CreateCommand.build(data);

    const payload: OrderContract.CreateCommand.Response | SendErrorUtil = await new Promise(
      async res => {
        const response = this.orderClient.send<
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

  public find = async (
    data: OrderContract.FindQuery.Payload,
  ): Promise<OrderContract.FindQuery.Response | SendErrorUtil> => {
    const record = OrderContract.FindQuery.build(data);

    const payload: OrderContract.FindQuery.Response | SendErrorUtil = await new Promise(
      async res => {
        const response = this.orderClient.send<
          OrderContract.FindQuery.Response,
          OrderContract.FindQuery.Record
        >(OrderContract.FindQuery.Pattern, record);

        response.subscribe({
          next: async data => res(data),
          error: err => res(new ErrorUtil(502).send({ error: err.message, payload: err })),
        });
      },
    );

    return payload;
  };

  public get = async (
    data: OrderContract.GetQuery.Payload,
  ): Promise<OrderContract.GetQuery.Response[] | SendErrorUtil> => {
    const record = OrderContract.GetQuery.build(data);

    const payload: OrderContract.GetQuery.Response[] | SendErrorUtil = await new Promise(
      async res => {
        const response = this.orderClient.send<
          OrderContract.GetQuery.Response[],
          OrderContract.GetQuery.Record
        >(OrderContract.GetQuery.Pattern, record);

        response.subscribe({
          next: async data => res(data),
          error: err => res(new ErrorUtil(502).send({ error: err.message, payload: err })),
        });
      },
    );

    return payload;
  };

  public all = async (
    data: OrderContract.AllQuery.Payload,
  ): Promise<OrderContract.AllQuery.Response[] | SendErrorUtil> => {
    const record = OrderContract.AllQuery.build(data);

    const payload: OrderContract.AllQuery.Response[] | SendErrorUtil = await new Promise(
      async res => {
        const response = this.orderClient.send<
          OrderContract.AllQuery.Response[],
          OrderContract.AllQuery.Record
        >(OrderContract.AllQuery.Pattern, record);

        response.subscribe({
          next: async data => res(data),
          error: err => res(new ErrorUtil(502).send({ error: err.message, payload: err })),
        });
      },
    );

    return payload;
  };

  public update = async (
    data: OrderContract.UpdateCommand.Payload,
  ): Promise<OrderContract.UpdateCommand.Response | SendErrorUtil> => {
    const record = OrderContract.UpdateCommand.build(data);

    const payload: OrderContract.UpdateCommand.Response | SendErrorUtil = await new Promise(
      async res => {
        const response = this.orderClient.send<
          OrderContract.UpdateCommand.Response,
          OrderContract.UpdateCommand.Record
        >(OrderContract.UpdateCommand.Pattern, record);

        response.subscribe({
          next: async data => res(data),
          error: err => res(new ErrorUtil(502).send({ error: err.message, payload: err })),
        });
      },
    );

    return payload;
  };

  public paid = async (
    data: PaidOrderInput,
  ): Promise<OrderContract.ReceiptPaidCommand.Response | SendErrorUtil> => {
    const record = OrderContract.ReceiptPaidCommand.build(data);

    const payload: OrderContract.ReceiptPaidCommand.Response | SendErrorUtil = await new Promise(
      async res => {
        const response = this.orderClient.send<
          OrderContract.ReceiptPaidCommand.Response,
          OrderContract.ReceiptPaidCommand.Record
        >(OrderContract.ReceiptPaidCommand.Pattern, record);

        response.subscribe({
          next: async data => res(data),
          error: err => res(new ErrorUtil(502).send({ error: err.message, payload: err })),
        });
      },
    );

    return payload;
  };
}
