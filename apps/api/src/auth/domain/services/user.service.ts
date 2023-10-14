import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories';
import { User } from '../entities';

@Injectable()
export class UserService {
  constructor(
    @Inject(IUserRepository) private userRepository: IUserRepository,
  ) {}

  async create(user: User, password: string): Promise<void> {
    const existingUser = await this.userRepository.findById(user.username);
    if (existingUser) {
      throw new Error('user already exists');
    }

    await this.userRepository.save(user);
  }
}
