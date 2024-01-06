import { Module } from '@nestjs/common';
import { HelloResolver } from './interfaces/graphql/hello.resolver';

@Module({
  providers: [HelloResolver],
})
export class HelloModule {}
