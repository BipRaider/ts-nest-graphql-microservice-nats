import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { SendErrorUtil } from '@common/utils';
import { UserContract } from '@common/contracts';

import { IEmailController } from './types';
import { EmailService } from './email.service';

@Controller()
export class EmailController implements IEmailController {
  constructor(private readonly emailService: EmailService) {}

  @MessagePattern(UserContract.CreateCommand.Pattern)
  public async order(@Payload() payload): Promise<boolean | SendErrorUtil> {
    const email = await this.emailService.order(payload, payload);

    // if ('status' in email) return email;

    return email;
  }

  @MessagePattern(UserContract.CreateCommand.Pattern)
  public async payment(@Payload() payload): Promise<boolean | SendErrorUtil> {
    const email = await this.emailService.payment(payload, payload);

    return email;
  }

  @MessagePattern(UserContract.CreateCommand.Pattern)
  public async resetPassword(@Payload() payload): Promise<boolean | SendErrorUtil> {
    const email = await this.emailService.resetPassword(payload, payload);

    return email;
  }

  @MessagePattern(UserContract.CreateCommand.Pattern)
  public async emailConfirmation(@Payload() payload): Promise<boolean | SendErrorUtil> {
    const email = await this.emailService.emailConfirmation(payload, payload);

    return email;
  }

  @MessagePattern(UserContract.CreateCommand.Pattern)
  public async welcome(@Payload() payload): Promise<boolean | SendErrorUtil> {
    const email = await this.emailService.welcome(payload);

    return email;
  }
}
