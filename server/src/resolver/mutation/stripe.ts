import { Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Cart } from "../../entity/cart";
import { User } from "../../entity/user";
import { isAuth } from "../../middleware/isAuth";
import { stripe } from "../../stripe";
import { Context } from "../../types";

@Resolver()
export class StripeMutation {
  @UseMiddleware(isAuth)
  @Mutation(() => String)
  async createCheckoutSession(@Ctx() { req }: Context): Promise<String> {
    const user = await User.findOne(req.session.userId);
    const cart = await Cart.findOne(req.session.cartId);

    if (cart!.itemCount === 0) {
      throw new Error("you must add at least one item to the cart");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: user!.stripeId ? undefined : user!.email,
      customer: user!.stripeId || undefined,
      line_items: cart?.cartItems.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.item.name,
            },
            unit_amount: Math.round(item.item.unitAmount * 100),
          },

          quantity: item.quantity,
        };
      }),
      mode: "payment",
      cancel_url: "http://localhost:3000/cancel",
      success_url: "http://localhost:3000/success/{CHECKOUT_SESSION_ID}",
    });

    const url = session.url as string;

    return url;
  }
}
