import { ISendMailOptions } from '@nestjs-modules/mailer';
import {
  Address,
  AttachmentLikeObject,
} from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';
import { EmailTemplate } from './enum';

export interface IMailOptions extends ISendMailOptions {
  template: EmailTemplate;
}

export interface IEmailContext {
  [name: string]: string | number;
}

export interface IEmail {
  template: EmailTemplate;
  to: string | Address | (string | Address)[];
  subject: string;
  from?: string | Address;
  text?: string | Buffer | AttachmentLikeObject;
  sender?: string | Address;
  context: IEmailContext;
}
