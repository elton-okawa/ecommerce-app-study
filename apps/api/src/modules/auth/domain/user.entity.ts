import { Password } from './password.vo';
import { AggregateRoot } from 'src/core/domain/aggregate-root';
import { UserCreated } from './user-created.event';

type UserConstructor = {
  id?: string;
  username: string;
  password: Password;
};

export class User extends AggregateRoot<User> {
  username: string;
  private _password: Password;

  get password() {
    return this._password.toString();
  }

  constructor(params: UserConstructor) {
    super(params.id);

    this.username = params.username;
    this._password = params.password;
  }

  static async create(username: string, password: string): Promise<User> {
    const pwd = await Password.create(password);

    const user = new User({ username, password: pwd });
    user.addEvent(new UserCreated(user));
    return user;
  }

  isCorrectPassword(password: string): Promise<boolean> {
    return this._password.isCorrect(password);
  }
}
