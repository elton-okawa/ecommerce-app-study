import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignupInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
