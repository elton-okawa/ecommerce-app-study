import { Product } from '../domain';

export interface IProductRepository {
  save(product: Product): Promise<Product>;
}

export const IProductRepository = Symbol('IProductRepository');
