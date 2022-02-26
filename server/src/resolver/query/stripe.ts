import { stripe } from "../../stripe";
import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { Context } from "../../types";
import { User } from "../../entity/user";
import { Order } from "../../entity/order";
import { Cart } from "../../entity/cart";
import { isAuth } from "../../middleware/isAuth";

@Resolver()
export class StripeQuery {
  @UseMiddleware(isAuth)
  @Query(() => User)
  async checkoutSuccess(
    @Arg("sessionId") sessionId: string,
    @Ctx() { req }: Context
  ): Promise<User> {
    const user = await User.findOne(req.session.userId);

    if (!user) {
      throw new Error("user not found");
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    if (!user.stripeId) {
      const customer = await stripe.customers.retrieve(
        session.customer as string
      );
      user.stripeId = customer.id;
      await user.save();
    }

    await Order.create({
      userId: req.session.userId,
      cartId: req.session.cartId,
      stripeId: session.id,
    }).save();

    await Cart.update(req.session.cartId, {
      active: false,
    });
    const cart = await Cart.create({ userId: req.session.userId }).save();

    req.session.cartId = cart.id;

    return user;
  }
}
