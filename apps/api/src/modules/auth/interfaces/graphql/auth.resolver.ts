import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './objects/user.object';
import { LoginInput } from './inputs/login.input';
import { AuthenticateUser, CreateUser } from '../../use-cases';
import { SignupInput } from './inputs/signup.input';
import { Token } from './objects/token.object';

@Resolver()
export class AuthResolver {
  constructor(
    private authenticateUser: AuthenticateUser,
    private createUser: CreateUser,
  ) {}

  @Mutation((returns) => Token)
  async login(@Args('loginInput') loginInput: LoginInput) {
    const res = await this.authenticateUser.execute(loginInput);
    // TODO deal with error

    return res.value;
  }

  @Mutation((returns) => User, { nullable: true })
  async signup(@Args('signupInput') signupInput: SignupInput) {
    const res = await this.createUser.execute(signupInput);
    // TODO deal with error

    return res.value;
  }
}
