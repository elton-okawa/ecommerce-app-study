import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from './objects/product.object';
import { CreateProduct, ListProducts } from '../../use-cases';
import { GraphQLBusinessError } from 'src/interfaces/graphql';
import { CreateProductInput } from './inputs';

@Resolver()
export class ProductResolver {
  constructor(
    private createProduct: CreateProduct,
    private listProducts: ListProducts,
  ) {}

  @Mutation(() => Product, { name: 'createProduct' })
  async create(@Args('createInput') createInput: CreateProductInput) {
    const res = await this.createProduct.execute(createInput);
    if (res.failed) {
      throw new GraphQLBusinessError(res.errorMessage);
    }

    return res.value;
  }

  @Query(() => [Product], { name: 'listProducts' })
  async list() {
    const res = await this.listProducts.execute();
    if (res.failed) {
      throw new GraphQLBusinessError(res.errorMessage);
    }

    return res.value;
  }
}
