import { User } from 'src/modules/auth/domain';

const user = {
  username: 'user',
  password: 'password',
};

export class UserFixture {
  static get default() {
    return User.create(user.username, user.password);
  }
}
