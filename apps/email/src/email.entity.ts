import {
  Address,
  AttachmentLikeObject,
} from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';

import { IEmail, IMailOptions, ENUM } from '@common/interface';

/** Class to working with the data use
 ** Always work via this class when work a data of the user.
 */
export class Entity implements IMailOptions, IEmail {
  public template: ENUM.EmailTemplate = undefined;
  public to: string | Address | (string | Address)[] = [];
  public from: string | Address = undefined;
  public subject: string = undefined;
  public text: string | Buffer | AttachmentLikeObject = undefined;
  public sender: string | Address = undefined;
  public context: { [key: string]: string | number } = undefined;

  constructor(data: IEmail) {
    if ('template' in data) this.template = data.template;
    if ('to' in data) this.to = data.to;
    if ('from' in data) this.from = data.from;
    if ('subject' in data) this.subject = data.subject;
    if ('text' in data) this.text = data.text;
    if ('sender' in data) this.sender = data.sender;
    if ('context' in data) this.context = data.context;
  }

  //Private func
  private filterProperty = (property: IEmail): IMailOptions => {
    for (const key in property) {
      if (property[key] === null) delete property[key];
      if (property[key] === undefined) delete property[key];
      if (typeof property[key] === 'object') this.filterProperty(property[key]);
    }
    return property;
  };

  send = (): IMailOptions => {
    const { template, to, from, subject, text, sender, context } = this;
    return this.filterProperty({ template, to, from, subject, text, sender, context });
  };
}
