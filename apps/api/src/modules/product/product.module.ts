import { Module } from '@nestjs/common';
import { ProductRepository } from './infra/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IProductRepository } from './repositories';
import { Product } from './domain';
import { CreateProduct, ListProducts } from './use-cases';
import { ProductController } from './interfaces/http/product.controller';
import { ProductResolver } from './interfaces/graphql/product.resolver';

@Module({
  controllers: [ProductController],
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [
    {
      provide: IProductRepository,
      useClass: ProductRepository,
    },
    ProductResolver,
    CreateProduct,
    ListProducts,
  ],
})
export class ProductModule {}
