import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SafeUser, UsersService } from 'src/users/users.service';
import { LoginResponse } from '@elton-okawa/types';

export interface JwtPayload {
  username: string;
  sub: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<SafeUser | null> {
    const user = await this.usersService.findByUsername(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: SafeUser): Promise<LoginResponse> {
    const payload: JwtPayload = {
      username: user.username,
      sub: user.id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async getUserFromToken(token: string): Promise<{ id: string; name: string }> {
    const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
    return { id: payload.sub, name: payload.username };
  }
}
