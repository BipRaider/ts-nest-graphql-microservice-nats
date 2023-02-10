import { IBaseData } from '../base';

export interface IProduct {
  /*** Who user added the product.*/
  readonly userId: IBaseData['id'];
  /*** Which store is owner.*/
  readonly storeId: IBaseData['id'];
  /*** The product name.*/
  readonly name: string;
  /*** The product price.*/
  readonly price: number;
  /*** The product amount.*/
  readonly amount: number;
  /*** The description to product. */
  readonly description: string;
  /*** The discount to product. From `0` to `100` %.*/
  readonly discount: number;
  /*** The product has been removed or not.*/
  readonly isRemove: boolean;
}
export type TUpdateProductDB = Required<
  Pick<IProduct, 'amount' | 'description' | 'isRemove' | 'price' | 'discount'>
>;
