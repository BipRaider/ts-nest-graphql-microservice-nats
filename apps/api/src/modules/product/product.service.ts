import { Inject, Injectable } from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';

import { ENUM } from '@common/interface';
import { ProductContract } from '@common/contracts';
import { ErrorUtil, SendErrorUtil } from '@common/utils';

@Injectable()
export class ProductService {
  constructor(@Inject(ENUM.NatsServicesName.PRODUCT) private readonly productClient: ClientNats) {}

  public create = async (
    data: ProductContract.CreateCommand.Payload,
  ): Promise<ProductContract.CreateCommand.Response | SendErrorUtil> => {
    const record = ProductContract.CreateCommand.build(data);

    const payload: ProductContract.CreateCommand.Response | SendErrorUtil = await new Promise(
      async res => {
        const response = this.productClient.send<
          ProductContract.CreateCommand.Response,
          ProductContract.CreateCommand.Record
        >(ProductContract.CreateCommand.Pattern, record);

        response.subscribe({
          next: async data => res(data),
          error: err => res(new ErrorUtil(502).send({ error: err.message, payload: err })),
        });
      },
    );

    return payload;
  };

  public update = async (
    data: ProductContract.UpdateCommand.Payload,
  ): Promise<ProductContract.UpdateCommand.Response | SendErrorUtil> => {
    const record = ProductContract.UpdateCommand.build(data);

    const payload: ProductContract.UpdateCommand.Response | SendErrorUtil = await new Promise(
      async res => {
        const response = this.productClient.send<
          ProductContract.UpdateCommand.Response,
          ProductContract.UpdateCommand.Record
        >(ProductContract.UpdateCommand.Pattern, record);

        response.subscribe({
          next: async data => res(data),
          error: err => res(new ErrorUtil(502).send({ error: err.message, payload: err })),
        });
      },
    );

    return payload;
  };

  public find = async (
    data: ProductContract.FindQuery.Payload,
  ): Promise<ProductContract.FindQuery.Response | SendErrorUtil> => {
    const record = ProductContract.FindQuery.build(data);

    const payload: ProductContract.FindQuery.Response | SendErrorUtil = await new Promise(
      async res => {
        const response = this.productClient.send<
          ProductContract.FindQuery.Response,
          ProductContract.FindQuery.Record
        >(ProductContract.FindQuery.Pattern, record);

        response.subscribe({
          next: async data => res(data),
          error: err => res(new ErrorUtil(502).send({ error: err.message, payload: err })),
        });
      },
    );

    return payload;
  };

  public get = async (
    data: ProductContract.GetQuery.Payload,
  ): Promise<ProductContract.GetQuery.Response[] | SendErrorUtil> => {
    const record = ProductContract.GetQuery.build(data);

    const payload: ProductContract.GetQuery.Response[] | SendErrorUtil = await new Promise(
      async res => {
        const response = this.productClient.send<
          ProductContract.GetQuery.Response[],
          ProductContract.GetQuery.Record
        >(ProductContract.GetQuery.Pattern, record);

        response.subscribe({
          next: async data => res(data),
          error: err => res(new ErrorUtil(502).send({ error: err.message, payload: err })),
        });
      },
    );

    return payload;
  };

  public all = async (
    data: ProductContract.AllQuery.Payload,
  ): Promise<ProductContract.AllQuery.Response[] | SendErrorUtil> => {
    const record = ProductContract.AllQuery.build(data);

    const payload: ProductContract.AllQuery.Response[] | SendErrorUtil = await new Promise(
      async res => {
        const response = this.productClient.send<
          ProductContract.AllQuery.Response[],
          ProductContract.AllQuery.Record
        >(ProductContract.AllQuery.Pattern, record);

        response.subscribe({
          next: async data => res(data),
          error: err => res(new ErrorUtil(502).send({ error: err.message, payload: err })),
        });
      },
    );

    return payload;
  };
}
