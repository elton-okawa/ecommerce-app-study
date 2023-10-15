import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories';
import { User } from '../entities';
import { Result } from 'src/domain';

const GENERIC_AUTH_ERROR = 'invalid username or password';

@Injectable()
export class UserService {
  constructor(
    @Inject(IUserRepository) private userRepository: IUserRepository,
  ) {}

  async create(username: string, password: string): Promise<Result<void>> {
    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      return Result.error('user already exists');
    }

    const user = await User.create(username, password);
    await this.userRepository.save(user);
    return Result.success();
  }

  async authenticate(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new Error(GENERIC_AUTH_ERROR);
    }

    const correctPassword = await user.isCorrectPassword(password);
    if (!correctPassword) {
      throw new Error(GENERIC_AUTH_ERROR);
    }

    return user;
  }
}
