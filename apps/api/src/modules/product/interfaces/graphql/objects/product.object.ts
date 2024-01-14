import { Field, ObjectType } from '@nestjs/graphql';
import { ProductImage } from './product-image.object';

@ObjectType()
export class Product {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field((type) => [ProductImage])
  images: ProductImage[];
}
