import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCart } from './use-cases';
import { CartEntity, CartRepository } from './infra/database';
import { ICartRepository } from './repositories';
import { AfterUserCreated } from './subscribers';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity])],
  providers: [
    CreateCart,
    {
      provide: ICartRepository,
      useClass: CartRepository,
    },
    AfterUserCreated,
  ],
  exports: [],
})
export class CartModule {}
