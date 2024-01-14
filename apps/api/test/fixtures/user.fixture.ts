import { User } from 'src/modules/auth/domain';

const user = {
  username: 'username',
  password: 'password',
};

export class UserFixture {
  static get default() {
    return User.create(user.username, user.password);
  }
}
