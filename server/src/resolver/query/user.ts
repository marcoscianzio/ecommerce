import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { Context } from "../../types";
import { Item } from "../../entity/item";
import { getConnection } from "typeorm";
import { User } from "../../entity/user";
import { isAuth } from "../../middleware/isAuth";

@Resolver()
export class UserQuery {
  @UseMiddleware(isAuth!)
  @Query(() => [Item])
  async myFavorites(@Ctx() { req }: Context): Promise<Item[]> {
    return await getConnection()
      .createQueryBuilder()
      .relation(User, "favorites")
      .of(req.session.userId)
      .loadMany();
  }
}
