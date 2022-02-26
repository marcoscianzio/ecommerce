import { Cart } from "../../entity/cart";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Context } from "../../types";
import { getConnection } from "typeorm";
import { CartItem } from "../../entity/cartItem";
import { Item } from "../../entity/item";
import { isAuth } from "../../middleware/isAuth";

@Resolver()
export class CartResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Cart)
  async createCart(@Ctx() { req }: Context): Promise<Cart> {
    const cart = await Cart.create({
      userId: req.session.userId,
    }).save();

    req.session.cartId = cart.id;

    return cart;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async addItemToCart(
    @Arg("itemId") itemId: string,
    @Ctx() { req }: Context
  ): Promise<Boolean> {
    const cartId = req.session.cartId;
    const item = await Item.findOne({ id: itemId });

    if (!item) {
      throw new Error("the item wasn't found");
    }

    if (item.available) {
      try {
        await CartItem.insert({
          cartId,
          itemId,
        });
      } catch (error) {
        await getConnection().manager.increment(
          CartItem,
          { cartId, itemId },
          "quantity",
          1
        );
        await getConnection().manager.decrement(
          Item,
          { id: itemId },
          "stock",
          1
        );
      }
    } else {
      return false;
    }

    return true;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async removeItemFromCart(
    @Arg("itemId") itemId: string,
    @Arg("whole", () => Boolean, { nullable: true, defaultValue: false })
    whole: boolean,
    @Ctx()
    { req }: Context
  ) {
    const cartId = req.session.cartId;

    const cartItem = await CartItem.findOne({ cartId, itemId });
    if (cartItem?.quantity !== 1 && !whole) {
      await getConnection().manager.decrement(
        CartItem,
        { cartId, itemId },
        "quantity",
        1
      );
    } else {
      await CartItem.delete({ cartId, itemId });
    }

    await getConnection().manager.increment(Item, { id: itemId }, "stock", 1);

    return true;
  }
}
