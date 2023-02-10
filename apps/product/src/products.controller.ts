import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { ProductContract } from '@common/contracts';
import { SendErrorUtil } from '@common/utils';

import { ProductService } from './products.service';
import { IProductController } from './types';
import { Entity } from './product.entity';

@Controller()
export class ProductController implements IProductController {
  constructor(private readonly productsService: ProductService) {}

  // @MessagePattern(`${ENUM.NatsServicesQueue.EXCHEQUER}.*`)
  // async getDateOrder(@Payload() payload: unknown) {
  //   console.log(`payload:`, { payload });
  //   return 'sss';
  // }

  @MessagePattern(ProductContract.CreateCommand.Pattern)
  public async create(
    @Payload() payload: ProductContract.CreateCommand.Request,
  ): Promise<SendErrorUtil | ProductContract.CreateCommand.Response> {
    const item: Entity | SendErrorUtil = await this.productsService.create(payload);

    if ('status' in item) return item;

    return {
      created: item.created,
      updated: item.updated,
      id: item.id,
    };
  }

  @MessagePattern(ProductContract.FindQuery.Pattern)
  public async find(
    @Payload() payload: ProductContract.FindQuery.Request,
  ): Promise<SendErrorUtil | ProductContract.FindQuery.Response> {
    const item: Entity | SendErrorUtil = await this.productsService.find(payload);

    if ('status' in item) return item;

    return item;
  }

  @MessagePattern(ProductContract.GetQuery.Pattern)
  public async get(
    @Payload() payload: ProductContract.GetQuery.Request,
  ): Promise<SendErrorUtil | ProductContract.GetQuery.Response[]> {
    const item: Entity[] | SendErrorUtil = await this.productsService.get(payload);

    if ('status' in item) return item;

    return item;
  }

  @MessagePattern(ProductContract.AllQuery.Pattern)
  public async all(
    @Payload() payload: ProductContract.AllQuery.Request,
  ): Promise<SendErrorUtil | ProductContract.AllQuery.Response[]> {
    const item: Entity[] | SendErrorUtil = await this.productsService.all(payload);

    if ('status' in item) return item;

    return item;
  }
}
