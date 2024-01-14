import { Injectable } from '@nestjs/common';
import { IProductRepository } from '../../repositories';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../domain';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  save(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  list(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['images'] });
  }
}
