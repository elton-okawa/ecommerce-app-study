import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { IUserRepository } from 'src/auth/domain/repositories';
import { Repository } from 'typeorm';
import { User } from 'src/auth/domain/entities';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  findById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
