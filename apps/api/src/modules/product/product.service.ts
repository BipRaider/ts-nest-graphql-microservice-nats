import { Inject, Injectable } from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';

import { ENUM } from '@common/interface';
import { ProductContract } from '@common/contracts';
import { ErrorUtil, SendErrorUtil } from '@common/utils';
import {
  AllProductsInput,
  CreateProductInput,
  FindProductInput,
  GetProductsInput,
} from './dto/input';

@Injectable()
export class ProductService {
  constructor(@Inject(ENUM.NatsServicesName.PRODUCT) private readonly productClient: ClientNats) {}

  public create = async (
    data: CreateProductInput,
  ): Promise<ProductContract.CreateCommand.Response | SendErrorUtil> => {
    const record = ProductContract.CreateCommand.build({ ...data });

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

  public find = async (
    data: FindProductInput,
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
    data: GetProductsInput,
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
    data: AllProductsInput,
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
