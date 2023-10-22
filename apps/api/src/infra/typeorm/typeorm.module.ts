import { TypeOrmModule as OriginalTypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/auth/infra/database';
import { Product } from 'src/modules/product/domain';
import { ProductImage } from 'src/modules/product/domain/product-image';

export const TypeOrmModule = OriginalTypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'user',
  password: 'password',
  database: 'db',
  entities: [UserEntity, Product, ProductImage],
  synchronize: true,
});
