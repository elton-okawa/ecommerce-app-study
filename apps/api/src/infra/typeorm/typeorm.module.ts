import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule as OriginalTypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/auth/infra/database';
import { Product } from 'src/modules/product/domain';
import { ProductImage } from 'src/modules/product/domain/product-image';

export const TypeOrmModule = OriginalTypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: 3306,
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [UserEntity, Product, ProductImage],
    synchronize: configService.get('DB_SYNC') === 'true',
  }),
  inject: [ConfigService],
});
