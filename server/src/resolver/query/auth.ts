import { User } from "../../entity/user";
import { Ctx, Query, Resolver } from "type-graphql";
import { Context } from "../../types";

@Resolver()
export class AuthQuery {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: Context): Promise<User | undefined> {
    return req.session.userId
      ? await User.findOne(req.session.userId)
      : undefined;
  }
}
