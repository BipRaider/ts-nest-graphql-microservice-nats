import { UserContract } from '@common/contracts';
import { SendErrorUtil } from '@common/utils';
import { IEmailContext } from '@common/interface';

/*** A class working like `mediator` with classes `controller` and `repository`.
 **  * Getting data from `controller` and modify them for `repository`.
 **  * Getting data from `repository` and modify them for `controller`.
 **  Where next steps:  `controller -> request -> repository -> response -> controller`.
 */
export interface IEmailService {
  /** The function to work and modify data for `creating` a user. */
  welcome: (toEmail: string) => Promise<boolean | SendErrorUtil>;
  order: (toEmail: string, context: IEmailContext) => Promise<boolean | SendErrorUtil>;
  payment: (toEmail: string, context: IEmailContext) => Promise<boolean | SendErrorUtil>;
  resetPassword: (toEmail: string, token: string) => Promise<boolean | SendErrorUtil>;
  emailConfirmation: (toEmail: string, token: string) => Promise<boolean | SendErrorUtil>;
}
