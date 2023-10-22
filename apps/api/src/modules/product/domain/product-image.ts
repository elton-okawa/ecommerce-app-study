import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from './product.entity';
import { randomUUID } from 'crypto';

interface ProductImageParams {
  id?: string;
  url: string;
  product: Product;
}

@Entity()
export class ProductImage {
  @PrimaryColumn()
  id: string;

  @Column()
  url: string;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;

  constructor(params?: ProductImageParams) {
    if (!params) return;

    this.id = params.id ?? randomUUID();
    this.url = params.url;
    this.product = params.product;
  }
}
