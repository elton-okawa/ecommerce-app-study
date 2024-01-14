import { Inject, Injectable } from '@nestjs/common';
import { Result, UseCase } from 'src/core/domain';
import { Product } from '../domain';
import { IProductRepository } from '../repositories';

@Injectable()
export class ListProducts implements UseCase<void, Result<Product[]>> {
  constructor(
    @Inject(IProductRepository) private productRepository: IProductRepository,
  ) {}

  async execute(): Promise<Result<Product[]>> {
    const products = await this.productRepository.list();
    return Result.success(products);
  }
}
