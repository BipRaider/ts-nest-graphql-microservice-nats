import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, NatsContext, Payload } from '@nestjs/microservices';

import { ExchequerService } from './exchequer.service';

import { ENUM } from '@common/interface';

@Controller()
export class ExchequerController {
  constructor(private readonly exchequerService: ExchequerService) {}

  @EventPattern(`${ENUM.NatsServicesQueue.EXCHEQUER}.*`)
  async eventOrder(@Payload() payload: unknown) {
    console.log(`eventOrder:`, { payload });
    return 'sss';
  }

  @MessagePattern(`${ENUM.NatsServicesQueue.EXCHEQUER}.*`)
  async getDateOrder(@Payload() payload: unknown) {
    console.log(`payload:`, { payload });
    return 'sss';
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
