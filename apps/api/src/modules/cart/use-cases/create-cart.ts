import { Inject, Injectable } from '@nestjs/common';
import { Cart } from '../domain';
import { Result, UseCase } from 'src/core/domain';
import { ICartRepository } from '../repositories';

export type CreateCartParams = {
  userId: string;
};

@Injectable()
export class CreateCart implements UseCase<CreateCartParams, Cart> {
  constructor(
    @Inject(ICartRepository) private cartRepository: ICartRepository,
  ) {}

  async execute(params: CreateCartParams): Promise<Result<Cart>> {
    const cart = Cart.create({ userId: params.userId });
    const saved = await this.cartRepository.save(cart);

    return Result.success(saved);
  }
}
