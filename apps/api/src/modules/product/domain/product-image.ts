import { Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from './product.entity';
import { randomUUID } from 'crypto';

interface ProductImageParams {
  id?: string;
  url: string;
}

export class ProductImage {
  @PrimaryColumn()
  id: string;

  @Column()
  url: string;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;

  constructor(params: ProductImageParams) {
    this.id = params.id ?? randomUUID();
    this.url = params.url;
  }
}
