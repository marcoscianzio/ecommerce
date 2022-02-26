import { Order } from "../../entity/order";
import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { Context } from "../../types";
import { isAuth } from "../../middleware/isAuth";

@Resolver()
export class OrderQuery {
  @UseMiddleware(isAuth)
  @Query(() => [Order])
  async myOrders(@Ctx() { req }: Context): Promise<Order[]> {
    return await Order.find({
      where: {
        userId: req.session.userId,
      },
    });
  }

  @UseMiddleware(isAuth)
  @Query(() => [Order])
  async orders(): Promise<Order[]> {
    return await Order.find();
  }

  @UseMiddleware(isAuth)
  @Query(() => Order, { nullable: true })
  async order(@Arg("id") id: string): Promise<Order | undefined> {
    const order = await Order.findOne(id);

    if (!order) {
      return undefined;
    }

    return order;
  }
}
