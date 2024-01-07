import {
  Controller,
  Post,
  Body,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDTO, TokenDTO, CreateUserDTO } from './dtos';
import { AuthenticateUser, CreateUser } from '../../use-cases';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(
    private authenticateUser: AuthenticateUser,
    private createUser: CreateUser,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDTO): Promise<TokenDTO> {
    const res = await this.authenticateUser.execute({
      username: loginDto.username,
      password: loginDto.password,
    });
    if (res.failed) {
      throw new UnprocessableEntityException(res.errorMessage);
    }

    return res.value;
  }

  @Post('users')
  async create(@Body() createUserDto: CreateUserDTO): Promise<void> {
    const res = await this.createUser.execute({
      username: createUserDto.username,
      password: createUserDto.password,
    });

    if (res.failed) {
      throw new UnprocessableEntityException(res.errorMessage);
    }
  }
}
