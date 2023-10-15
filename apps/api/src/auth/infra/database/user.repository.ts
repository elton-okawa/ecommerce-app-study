import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { IUserRepository } from 'src/auth/domain/repositories';
import { Repository } from 'typeorm';
import { User } from 'src/auth/domain/entities';
import { Password } from 'src/auth/domain/entities/password.vo';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) return null;

    return this.entityToDomain(user);
  }

  async save(user: User): Promise<User> {
    const entity = await this.userRepository.save(user);
    return this.entityToDomain(entity);
  }

  private entityToDomain(entity: UserEntity) {
    return new User(entity);
  }
}
