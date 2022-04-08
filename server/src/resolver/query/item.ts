import { Arg, Query, Resolver } from "type-graphql";
import { Equal, Not } from "typeorm";
import { Item } from "../../entity/item";

@Resolver(Item)
export class ItemQuery {
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
