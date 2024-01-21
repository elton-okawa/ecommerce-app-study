import { InjectRepository } from '@nestjs/typeorm';
import { ICartRepository } from '../../repositories';
import { CartEntity } from './cart.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cart } from '../../domain';

@Injectable()
export class CartRepository implements ICartRepository {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
  ) {}

  save(cart: Cart): Promise<Cart> {
    return this.cartRepository.save(cart);
  }
}
