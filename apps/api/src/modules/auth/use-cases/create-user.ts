import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories';
import { User } from '../domain';
import { Result, UseCase } from 'src/core/domain';
import { Cart } from 'src/modules/cart';

interface CreateUserParams {
  username: string;
  password: string;
}

@Injectable()
export class CreateUser implements UseCase<CreateUserParams, void> {
  constructor(
    @Inject(IUserRepository) private userRepository: IUserRepository,
  ) {}

  async execute({
    username,
    password,
  }: CreateUserParams): Promise<Result<void>> {
    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      return Result.fail('username already exists');
    }

    const user = await User.create(username, password);
    const cart = Cart.create({ userId: user.id });
    await this.userRepository.save(user);
    return Result.success();
  }
}
