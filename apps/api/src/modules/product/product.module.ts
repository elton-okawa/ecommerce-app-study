import { Module } from '@nestjs/common';
import { ProductRepository } from './infra/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IProductRepository } from './repositories';
import { Product } from './domain';
import { CreateProduct } from './use-cases';
import { ProductController } from './interfaces/http/product.controller';

@Module({
  controllers: [ProductController],
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [
    {
      provide: IProductRepository,
      useClass: ProductRepository,
    },
    CreateProduct,
  ],
})
export class ProductModule {}
