import { Cart } from '../domain';

export interface ICartRepository {
  save(entity: Cart): Promise<Cart>;
}

export const ICartRepository = Symbol('ICartRepository');
