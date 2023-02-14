import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import { envConfig } from '@common/config';
import { IEnvConfig } from '@common/interface';

import { Entity } from './email.entity';

import { IEmailContext, IMailOptions, ENUM } from '@common/interface';
import { IEmailService } from './types';
import { ErrorUtil, SendErrorUtil } from '@common/utils';

@Injectable()
export class EmailService implements IEmailService {
  private _env: IEnvConfig;
  constructor(private readonly mailer: MailerService) {
    this._env = envConfig();
  }

  private send(options: IMailOptions) {
    if (this._env.isProduction) {
      return this.mailer.sendMail(options);
    }
    return null;
  }

  public async welcome(toEmail: string): Promise<boolean | SendErrorUtil> {
    try {
      const mail = new Entity({
        template: ENUM.EmailTemplate.WELCOME,
        to: toEmail,
        subject: '🥳🎉 Welcome to the Shop',
        context: {
          siteUrl: this._env.email.clientUrl,
        },
      });

      await this.send(mail.send()).then();

      return true;
    } catch (error) {
      return new ErrorUtil(502).send({
        error: 'EmailService.welcome something wrong.',
        payload: error,
      });
    }
  }

  public async order(toEmail: string, context: IEmailContext): Promise<boolean | SendErrorUtil> {
    try {
      const mail = new Entity({
        template: ENUM.EmailTemplate.ORDER,
        to: toEmail,
        subject: '🥳🎉 Welcome to the Shop',
        context,
      });

      await this.send(mail.send()).then();
      return true;
    } catch (error) {
      return new ErrorUtil(502).send({
        error: 'EmailService.order something wrong.',
        payload: error,
      });
    }
  }

  public async payment(toEmail: string, context: IEmailContext): Promise<boolean | SendErrorUtil> {
    try {
      const mail = new Entity({
        template: ENUM.EmailTemplate.PAYMENT,
        to: toEmail,
        subject: '🥳🎉 Welcome to the Shop',
        context,
      });

      await this.send(mail.send()).then();
      return true;
    } catch (error) {
      return new ErrorUtil(502).send({
        error: 'EmailService.payment something wrong.',
        payload: error,
      });
    }
  }

  public async resetPassword(toEmail: string, token: string): Promise<boolean | SendErrorUtil> {
    try {
      const tokenUrl = `${this._env.email.clientUrl}/reset-password?token=${token}`;
      const mail = new Entity({
        template: ENUM.EmailTemplate.RESET_PASSWORD,
        to: toEmail,
        subject: '🔑 Request to recover your password',
        context: {
          tokenUrl,
        },
      });

      await this.send(mail.send()).then();
      return true;
    } catch (error) {
      return new ErrorUtil(502).send({
        error: 'EmailService.resetPassword something wrong.',
        payload: error,
      });
    }
  }

  public async emailConfirmation(toEmail: string, token: string): Promise<boolean | SendErrorUtil> {
    try {
      const tokenUrl = `${this._env.email.clientUrl}/activate?token=${token}`;

      const mail = new Entity({
        template: ENUM.EmailTemplate.EMAIL_CONFIRMATION,
        to: toEmail,
        subject: 'Confirmation you email registration',
        context: {
          tokenUrl,
        },
      });

      await this.send(mail.send()).then();

      return true;
    } catch (error) {
      return new ErrorUtil(502).send({
        error: 'EmailService.emailConfirmation something wrong.',
        payload: error,
      });
    }
  }
}
