import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request, UseGuards } from '@nestjs/common';
import { User } from './objects/user.object';
import { LoginInput } from './inputs/login.input';
import { AuthenticateUser, CreateUser } from '../../use-cases';
import { SignupInput } from './inputs/signup.input';
import { Token } from './objects/token.object';
import { GqlJwtAuthGuard, GraphQLBusinessError } from 'src/interfaces/graphql';

@Resolver()
export class AuthResolver {
  constructor(
    private authenticateUser: AuthenticateUser,
    private createUser: CreateUser,
  ) {}

  @UseGuards(GqlJwtAuthGuard)
  @Query((returns) => User)
  async me(@Context() ctx) {
    return ctx.req.user;
  }

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
