import { User } from '../domain/user.entity';

export interface IUserRepository {
  findByUsername(username: string): Promise<User | null>;
  save(user: User): Promise<User>;
}

export const IUserRepository = Symbol('IUserRepository');
