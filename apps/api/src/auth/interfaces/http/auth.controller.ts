import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../../app/auth.service';
import { LoginDTO } from '../dtos/login.dto';
import { TokenDTO } from '../dtos/token.dto';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDTO): Promise<TokenDTO> {
    return this.authService.login(loginDto.username, loginDto.password);
  }
}
