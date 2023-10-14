import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../domain/entities';
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

  async createUser(username: string, password: string) {
    const user = new User({ username });

    await this.userService.create(user, password);
  }

  async login(username: string, password: string): Promise<Token> {
    // read user from repo
    // validate password

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
