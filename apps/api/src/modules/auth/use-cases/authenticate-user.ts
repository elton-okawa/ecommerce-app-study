import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories';
import { Result, UseCase } from 'src/core/domain';
import { JwtService } from '@nestjs/jwt';

const GENERIC_AUTH_ERROR = 'invalid username or password';

export interface JwtPayload {
  username: string;
  sub: string;
}

export type Token = {
  accessToken: string;
};

interface AuthenticateParams {
  username: string;
  password: string;
}

@Injectable()
export class AuthenticateUser
  implements UseCase<AuthenticateParams, Result<Token>>
{
  constructor(
    @Inject(IUserRepository) private userRepository: IUserRepository,
    private jwtService: JwtService,
  ) {}

  async execute({
    username,
    password,
  }: AuthenticateParams): Promise<Result<Token>> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      return Result.fail(GENERIC_AUTH_ERROR);
    }

    const correctPassword = await user.isCorrectPassword(password);
    if (!correctPassword) {
      return Result.fail(GENERIC_AUTH_ERROR);
    }

    const payload: JwtPayload = {
      username: username,
      sub: username,
    };

    return Result.success({
      accessToken: this.jwtService.sign(payload),
    });
  }
}
