import { randomUUID } from 'crypto';
import { ProductImage } from './product-image';
import { Column, OneToMany, PrimaryColumn } from 'typeorm';

interface ProductParams {
  id?: string;
  name: string;
  description: string;
  price: number;
  images: ProductImage[];
}

interface CreateProductParams {
  name: string;
  description: string;
  price: number;
  images: string[];
}

export class Product {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @OneToMany(() => ProductImage, (image) => image.product)
  images: ProductImage[];

  constructor(params: ProductParams) {
    this.id = params.id ?? randomUUID();
    this.name = params.name;
    this.description = params.description;
    this.price = params.price;
    this.images = params.images;
  }

  static create(params: CreateProductParams) {
    const { images, ...others } = params;

    return new Product({
      ...others,
      images: images.map((img) => new ProductImage({ url: img })),
    });
  }
}
