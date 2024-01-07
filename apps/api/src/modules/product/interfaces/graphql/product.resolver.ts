import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Product } from './objects/product.object';
import { CreateProduct } from '../../use-cases';
import { GraphQLBusinessError } from 'src/interfaces/graphql';
import { CreateProductInput } from './inputs';

@Resolver()
export class ProductResolver {
  constructor(private createProduct: CreateProduct) {}

  @Mutation((returns) => Product)
  async create(@Args('createInput') createInput: CreateProductInput) {
    const res = await this.createProduct.execute(createInput);
    if (res.failed) {
      throw new GraphQLBusinessError(res.errorMessage);
    }

    return res.value;
  }
}
