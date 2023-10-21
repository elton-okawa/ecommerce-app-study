import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './interfaces/http/auth.controller';
import { IUserRepository } from './repositories';
import { AuthenticateUser, CreateUser } from './use-cases';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, UserRepository } from './infra/database';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
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
