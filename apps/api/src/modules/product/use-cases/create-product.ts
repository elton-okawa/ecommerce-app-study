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
  implements UseCase<CreateProductParams, Result<void>>
{
  constructor(
    @Inject(IProductRepository) private productRepository: IProductRepository,
  ) {}

  async execute(params: CreateProductParams): Promise<Result<void>> {
    const product = Product.create(params);
    await this.productRepository.save(product);
    return Result.success();
  }
}
