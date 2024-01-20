import { randomUUID } from 'crypto';

export type CartItemConstructor = {
  id?: string;
  cartId: string;
  amount: number;
  productId: string;
};

export class CartItem {
  private _id: string;
  private _cartId: string;
  private _amount: number;
  private _productId: string;

  get id() {
    return this._id;
  }

  constructor(params: CartItemConstructor) {
    this._id = params.id ?? randomUUID();
    this._cartId = params.cartId;
    this._amount = params.amount;
    this._productId = params.productId;
  }
}
