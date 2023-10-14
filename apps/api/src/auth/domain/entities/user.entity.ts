import { randomUUID } from 'crypto';

export class User {
  id: string;
  username: string;

  constructor(params: Partial<User>) {
    this.id = params.id ?? randomUUID();
    this.username = params.username;
  }
}
