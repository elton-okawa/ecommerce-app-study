import { Inject, Injectable } from '@nestjs/common';
import { Result, UseCase } from 'src/core/domain';
import { Product } from '../domain/product.entity';
import { IProductRepository } from '../repositories';

interface CreateProductParams {
  name: string;
  description: string;
  price: number;
  images: string[];
}

@Injectable()
export class CreateProduct
  implements UseCase<CreateProductParams, Result<Product>>
{
  constructor(
    @Inject(IProductRepository) private productRepository: IProductRepository,
  ) {}

  async execute(params: CreateProductParams): Promise<Result<Product>> {
    const product = Product.create(params);
    const saved = await this.productRepository.save(product);
    return Result.success(saved);
  }
}
