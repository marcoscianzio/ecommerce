import { isAuth } from "../../middleware/isAuth";
import {
  Ctx,
  FieldResolver,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Cart } from "../../entity/cart";
import { Context } from "../../types";

@Resolver(Cart)
export class CartQuery {
  @FieldResolver()
  itemCount(@Root() cart: Cart): number {
    let count = 0;

    cart.cartItems.forEach((x) => {
      count = count + x.quantity;
    });

    return count;
  }

  @UseMiddleware(isAuth)
  @Query(() => Cart, { nullable: true })
  async myCart(@Ctx() { req }: Context): Promise<Cart | undefined> {
    const cart = await Cart.findOne(req.session.cartId);

    if (!cart) {
      return undefined;
    }

    return cart;
  }

  @UseMiddleware(isAuth)
  @Query(() => [Cart])
  async carts(): Promise<Cart[]> {
    return await Cart.find();
  }
}
