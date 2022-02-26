import { isAuth } from "../../middleware/isAuth";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { Image } from "../../entity/image";
import { Item } from "../../entity/item";
import { User } from "../../entity/user";
import { CreateItemInput } from "../../inputs/item";
import { stripe } from "../../stripe";
import { Context } from "../../types";

@Resolver()
export class ItemMutation {
  @UseMiddleware(isAuth)
  @Mutation(() => Item)
  async createItem(
    @Arg("values")
    { images, name, stock, description, unitAmount }: CreateItemInput
  ): Promise<Item> {
    const imagesArray: Array<Image> = new Array(0);

    if (images) {
      images.forEach(async (x, y) => {
        const image = new Image();
        image.url = x.url;

        imagesArray.push(image);
        await getConnection().manager.save(image);
      });
    }

    const product = await stripe.products.create({
      name,
    });

    return await getConnection().manager.save(Item, {
      images: imagesArray,
      stripeId: product.id,
      name,
      stock,
      description,
      unitAmount,
    });
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async deleteItem(@Arg("id") id: string): Promise<Boolean> {
    await Item.delete(id);
    return true;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async toggleFavoriteItem(
    @Arg("id") id: string,
    @Ctx() { req }: Context
  ): Promise<Boolean> {
    const me = await User.findOne(req.session.userId);
    const item = await Item.findOne(id);

    if (!item) {
      throw new Error("Item not found");
    }

    try {
      await getConnection()
        .createQueryBuilder()
        .relation(User, "favorites")
        .of(me)
        .add(item);
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        await getConnection()
          .createQueryBuilder()
          .relation(User, "favorites")
          .of(me)
          .remove(item);
      }
    }

    return true;
  }
}
