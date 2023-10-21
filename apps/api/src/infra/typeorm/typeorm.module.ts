import { TypeOrmModule as OriginalTypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/auth/infra/database';

export const TypeOrmModule = OriginalTypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'user',
  password: 'password',
  database: 'db',
  entities: [UserEntity],
  synchronize: true,
});
