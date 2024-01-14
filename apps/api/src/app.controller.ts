import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { HttpJwtAuthGuard } from './interfaces/http/jwt-auth.guard';

@Controller()
export class AppController {
  @UseGuards(HttpJwtAuthGuard)
  @Get('users/me')
  getMe(@Request() req) {
    return req.user;
  }

  @Get('health-check')
  getHealthCheck() {
    return true;
  }
}
