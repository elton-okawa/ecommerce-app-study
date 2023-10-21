import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';

@Controller()
export class AppController {
  @UseGuards(JwtAuthGuard)
  @Get('users/me')
  getMe(@Request() req) {
    return req.user;
  }
}
