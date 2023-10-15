import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../domain/services';

export interface JwtPayload {
  username: string;
  sub: string;
}

export type Token = {
  accessToken: string;
};

@Injectable()
export class AuthApp {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<null> {
    return null;
    //   const user = await this.usersService.findByUsername(username);
    //   if (user && user.password === password) {
    //     const { password, ...result } = user;
    //     return result;
    //   }

    //   return null;
  }

  createUser(username: string, password: string) {
    return this.userService.create(username, password);
  }

  async login(username: string, password: string): Promise<Token> {
    await this.userService.authenticate(username, password);

    const payload: JwtPayload = {
      username: username,
      sub: username,
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
