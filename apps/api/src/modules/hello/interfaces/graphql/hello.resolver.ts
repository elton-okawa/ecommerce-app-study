import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloResolver {
  @Query((returns) => String)
  hello(@Args('name') name: string) {
    return `Hello ${name}`;
  }
}
