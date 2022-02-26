import { Field, InputType } from "type-graphql";

@InputType()
export class UserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
