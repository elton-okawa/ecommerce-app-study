import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './interfaces/http/auth.controller';
import { IUserRepository } from './repositories';
import { AuthenticateUser, CreateUser } from './use-cases';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, UserRepository } from './infra/database';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    AuthenticateUser,
    CreateUser,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
  exports: [],
  controllers: [AuthController],
})
export class AuthModule {}
