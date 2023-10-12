import { Injectable } from '@nestjs/common';

export interface User extends SafeUser {
  password: string;
}

export interface SafeUser {
  id: string;
  username: string;
  name: string;
}

// TODO persistence
const users: User[] = [
  {
    id: '1',
    username: 'dog',
    name: 'Dog Dog',
    password: 'dogdog',
  },
  {
    id: '2',
    username: 'cat',
    name: 'Cat Cat',
    password: 'catcat',
  },
];

@Injectable()
export class UsersService {
  async findByUsername(username: string): Promise<User | null> {
    const user = users.find((user) => user.username === username);
    if (!user) return null;

    return user;
  }
}
