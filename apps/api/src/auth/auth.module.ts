import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthApp } from './app/auth.app';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './interfaces/http/auth.controller';
import { IUserRepository } from './domain/repositories';
import { UserService } from './domain/services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, UserRepository } from './infra/database';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    AuthApp,
    LocalStrategy,
    JwtStrategy,
    UserService,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
  exports: [AuthApp],
  controllers: [AuthController],
})
export class AuthModule {}
