import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './objects/user.object';
import { LoginInput } from './inputs/login.input';
import { AuthenticateUser, CreateUser } from '../../use-cases';
import { SignupInput } from './inputs/signup.input';
import { Token } from './objects/token.object';
import { GraphQLBusinessError } from 'src/interfaces/graphql';

@Resolver()
export class AuthResolver {
  constructor(
    private authenticateUser: AuthenticateUser,
    private createUser: CreateUser,
  ) {}

  @Mutation((returns) => Token)
  async login(@Args('loginInput') loginInput: LoginInput) {
    const res = await this.authenticateUser.execute(loginInput);
    if (res.failed) {
      throw new GraphQLBusinessError(res.errorMessage);
    }

    return res.value;
  }

  @Mutation((returns) => User, { nullable: true })
  async signup(@Args('signupInput') signupInput: SignupInput) {
    const res = await this.createUser.execute(signupInput);
    if (res.failed) {
      throw new GraphQLBusinessError(res.errorMessage);
    }

    return res.value;
  }
}
