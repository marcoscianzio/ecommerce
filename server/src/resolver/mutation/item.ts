import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { Image } from "../../entity/image";
import { Item } from "../../entity/item";
import { CreateItemInput } from "../../inputs/item";
import { isAuth } from "../../middleware/isAuth";
import { stripe } from "../../stripe";

@Resolver()
export class ItemMutation {
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
}
