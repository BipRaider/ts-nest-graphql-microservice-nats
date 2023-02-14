import { UserContract } from '@common/contracts';

import { SendErrorUtil } from '@common/utils';

/*** A class for working only on `requests` and `responses` via a `class services`.
 ** Where next steps: `nats -> request -> service -> response -> nats`.
 */
export interface IEmailController {
  /** The function */
  welcome: (payload: any) => Promise<boolean | SendErrorUtil>;
  order: (payload: any) => Promise<boolean | SendErrorUtil>;
  payment: (payload: any) => Promise<boolean | SendErrorUtil>;
  resetPassword: (payload: any) => Promise<boolean | SendErrorUtil>;
  emailConfirmation: (payload: any) => Promise<boolean | SendErrorUtil>;
}
