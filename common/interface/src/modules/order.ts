import { IBaseData } from '../base';

export interface IOrder {
  /*** The user id. Who ordered.*/
  readonly customer: IBaseData['id'];
  /*** The products ids.*/
  readonly products: IBaseData['id'][];
  /*** The code order for user.*/
  readonly codeOrder: string;
  /*** The full price for all products.*/
  readonly price: number;
  /*** State. Paid-up of product or not.*/
  readonly paid: boolean;
  /*** State. Whether the order is being processed or not.*/
  readonly processed: boolean;
  /*** State. Sended of product or not to user.*/
  readonly send: boolean;
  /*** State. Received the user to product or not.*/
  readonly received: boolean;
  /*** State. Purchase returns to exchange.*/
  readonly purchase: boolean;
  /*** The order has been cancel or not.*/
  readonly isCancel: boolean;
  /*** State of the order.*/
  readonly isState: boolean;
}
