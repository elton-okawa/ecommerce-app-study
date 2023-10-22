import { Module } from '@nestjs/common';
import { ProductRepository } from './infra/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IProductRepository } from './repositories';
import { Product } from './domain';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [
    {
      provide: IProductRepository,
      useClass: ProductRepository,
    },
  ],
})
export class ProductModule {}
