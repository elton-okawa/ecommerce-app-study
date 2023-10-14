import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthApp } from '../../app/auth.app';
import { LoginDTO, TokenDTO, CreateUserDTO, UserDTO } from '../dtos';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private authApp: AuthApp) {}

  @Post('login')
  async login(@Body() loginDto: LoginDTO): Promise<TokenDTO> {
    return this.authApp.login(loginDto.username, loginDto.password);
  }

  @Post('users')
  async create(@Body() createUserDto: CreateUserDTO): Promise<void> {
    await this.authApp.createUser(
      createUserDto.username,
      createUserDto.password,
    );
  }
}
