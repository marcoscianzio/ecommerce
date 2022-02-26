import { CartItem } from "../../entity/cartItem";
import { FieldResolver, Query, Resolver, Root } from "type-graphql";

@Resolver(CartItem)
export class CartItemQuery {
  @FieldResolver()
  total(@Root() cartItem: CartItem): number {
    return cartItem.item.unitAmount * cartItem.quantity;
  }

  @Query(() => [CartItem])
  async cartItems(): Promise<CartItem[]> {
    return await CartItem.find();
  }
}
