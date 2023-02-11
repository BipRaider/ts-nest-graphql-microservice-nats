import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, NatsContext, Payload } from '@nestjs/microservices';

import { ExchequerService } from './exchequer.service';

import { ENUM } from '@common/interface';

@Controller()
export class ExchequerController {
  constructor(private readonly exchequerService: ExchequerService) {}

  @MessagePattern(`${ENUM.NatsServicesQueue.EXCHEQUER}.order.payment.*`)
  async getPaymentOrder(@Payload() payload: unknown, @Ctx() context: NatsContext) {
    console.log(`Subject: ${context.getSubject()}`);
    console.log(`getHeaders: ${context.getHeaders()}`);
    console.log(`getArgByIndex: ${context.getArgByIndex(1)}`);
    console.log(`getArgs: ${context.getArgs()}`);
    console.log(`payload:`, { payload });
    return 'ok';
  }

  @MessagePattern(`${ENUM.NatsServicesQueue.PRODUCT}.*`)
  getDateProduct(@Payload() payload: unknown, @Ctx() context: NatsContext) {
    console.log(`Subject: ${context.getSubject()}`);
    console.log(`payload:`, { payload });
    return;
  }

  @MessagePattern(`${ENUM.NatsServicesQueue.API}.*`)
  getDateAPI(@Payload() payload: unknown, @Ctx() context: NatsContext) {
    console.log(`Subject: ${context.getSubject()}`);
    console.log(`payload:`, { payload });
    return;
  }

  @MessagePattern(`${ENUM.NatsServicesQueue.ADMIN}.*`)
  getDateAdmin(@Payload() payload: unknown, @Ctx() context: NatsContext) {
    console.log(`Subject: ${context.getSubject()}`);
    console.log(`payload:`, { payload });
    return;
  }
}
