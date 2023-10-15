import { randomUUID } from 'crypto';
import { Password } from './password.vo';

type UserConstructor = {
  id?: string;
  username: string;
  password: Password;
};

export class User {
  id: string;
  username: string;
  private _password: Password;

  get password() {
    return this._password.toString();
  }

  constructor(params: UserConstructor) {
    this.id = params.id ?? randomUUID();
    this.username = params.username;
    this._password = params.password;
  }

  static async create(username: string, password: string): Promise<User> {
    const pwd = await Password.create(password);

    return new User({ username, password: pwd });
  }

  isCorrectPassword(password: string): Promise<boolean> {
    return this._password.isCorrect(password);
  }
}
