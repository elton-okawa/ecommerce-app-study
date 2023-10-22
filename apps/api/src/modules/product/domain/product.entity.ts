import { randomUUID } from 'crypto';
import { ProductImage } from './product-image';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

interface ProductParams {
  id?: string;
  name: string;
  description: string;
  price: number;
  images?: ProductImage[];
}

interface CreateProductParams {
  name: string;
  description: string;
  price: number;
  images: string[];
}

@Entity()
export class Product {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @OneToMany(() => ProductImage, (image) => image.product, { cascade: true })
  images: ProductImage[];

  constructor(params?: ProductParams) {
    if (!params) return;

    this.id = params.id ?? randomUUID();
    this.name = params.name;
    this.description = params.description;
    this.price = params.price;
    this.images = params.images ?? [];
  }

  static create(params: CreateProductParams) {
    const { images, ...others } = params;

    const product = new Product({
      ...others,
    });
    product.images = images.map(
      (img) => new ProductImage({ product, url: img }),
    );

    return product;
  }
}
