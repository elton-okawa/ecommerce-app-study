import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories';
import { User } from '../domain';
import { Result, UseCase } from 'src/core/domain';

interface CreateUserParams {
  username: string;
  password: string;
}

@Injectable()
export class CreateUser implements UseCase<CreateUserParams, Result<void>> {
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
    await this.userRepository.save(user);
    return Result.success();
  }
}
