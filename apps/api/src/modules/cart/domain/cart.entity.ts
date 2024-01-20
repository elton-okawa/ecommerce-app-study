import { randomUUID } from 'crypto';
import { CartItem } from './cart-item.entity';

export type CartCreate = {
  userId: string;
};

export type CartConstructor = {
  id?: string;
  userId: string;
  items?: CartItem[];
};

export class Cart {
  private _id: string;
  private _userId: string;
  private _items: Map<string, CartItem>;

  get id() {
    return this._id;
  }
  get userId() {
    return this._userId;
  }

  get items() {
    return this._items.values();
  }

  constructor(params: CartConstructor) {
    this._id = params.id ?? randomUUID();
    this._userId = params.userId;
    this._items = params.items.reduce(
      (map: Map<string, CartItem>, item: CartItem) => {
        map.set(item.id, item);
        return map;
      },
      new Map<string, CartItem>(),
    );
  }

  static create(params: CartCreate) {
    return new Cart(params);
  }
}
