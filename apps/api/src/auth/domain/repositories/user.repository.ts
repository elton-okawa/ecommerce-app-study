import { User } from '../entities/user.entity';

export interface IUserRepository {
  findByUsername(username: string): Promise<User | null>;
  save(user: User): Promise<User>;
}

export const IUserRepository = Symbol('IUserRepository');
