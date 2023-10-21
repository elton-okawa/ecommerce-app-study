import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from './infra/typeorm/typeorm.module';

@Module({
  imports: [AuthModule, TypeOrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
