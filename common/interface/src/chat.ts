import { IJwtGenerateToken } from './jwt';

export interface IPayloadNewMessage {
  body: {
    message: string;
    sent: Date;
  };
  userFrom: IJwtGenerateToken['id'];
  userTo?: IJwtGenerateToken['id'];
}
