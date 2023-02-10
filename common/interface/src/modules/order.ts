import { IBaseData } from '../base';
import { ORDER } from '../enum';

export interface IOrder {
  /*** The user id. Who ordered.*/
  readonly customer: IBaseData['id'];
  /*** The products ids.*/
  readonly products: IBaseData['id'][];
  /*** The code order for user.*/
  readonly codeOrder: string;
  /*** The full price for all products.*/
  readonly price: number;
  /*** State `0->1` and `2`.
   ** Paid-up of product or not.*/
  readonly paid: ORDER.PAID;
  /*** State.
   ** `true` next step `1->2`.
   ** If `false` - send a message to email.
   ** Whether the order is being processed or not.*/
  readonly processed: ORDER.PROCESS;
  /*** State `3`.
   ** Sended of product or not to user.*/
  readonly send: ORDER.SEND;
  /*** State `4` if not ok `5`.
   ** Received the user to product or not.*/
  readonly received: ORDER.RECEIVE;
  /*** State `5`.
   ** Purchase returns to exchange.*/
  readonly exchange: ORDER.EXCHANGE;
  /*** The order has been cancel or not.*/
  readonly isCancel: boolean;
  /*** State of the order.*/
  readonly isState: boolean;
}

export type TUpdateOrderDB = Required<
  Pick<IOrder, 'exchange' | 'paid' | 'processed' | 'received' | 'send' | 'isCancel' | 'isState'>
>;
