import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories';
import { User } from '../entities';

@Injectable()
export class UserService {
  constructor(
    @Inject(IUserRepository) private userRepository: IUserRepository,
  ) {}

  async create(username: string, password: string): Promise<void> {
    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      throw new Error('user already exists');
    }

    const user = await User.create(username, password);
    await this.userRepository.save(user);
  }
}
