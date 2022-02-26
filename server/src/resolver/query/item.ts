import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Equal, getConnection, Not } from "typeorm";
import { Item } from "../../entity/item";
import { User } from "../../entity/user";
import { Context } from "../../types";

@Resolver(Item)
export class ItemQuery {
  @FieldResolver()
  async liked(@Root() item: Item, @Ctx() { req }: Context) {
    let liked;
    if (!req.session.userId) {
      return false;
    }

    const likes = await getConnection()
      .createQueryBuilder()
      .relation(User, "favorites")
      .of(req.session.userId)
      .loadMany();

    console.log(likes);

    likes.length > 0
      ? likes.forEach((like) => {
          liked = like.id === item.id;
        })
      : (liked = false);

    return liked;
  }

  @Query(() => [Item])
  async items(): Promise<Item[]> {
    return await Item.find({
      where: {
        stock: Not(Equal(0)),
      },
    });
  }

  @Query(() => Item, { nullable: true })
  async item(@Arg("id") id: string): Promise<Item | undefined> {
    const item = await Item.findOne({
      where: {
        id,
      },
    });

    if (!item) {
      return undefined;
    }

    return item;
  }
}
