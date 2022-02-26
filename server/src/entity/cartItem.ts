import { Field, ObjectType } from "type-graphql";
import {
  AfterLoad,
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Cart } from "./cart";
import { Item } from "./item";

@ObjectType()
@Entity()
export class CartItem extends BaseEntity {
  @Field()
  @PrimaryColumn()
  cartId: string;

  @Field()
  @PrimaryColumn()
  itemId: string;

  @Field(() => Item)
  @ManyToOne(() => Item, (item) => item.cartItems, {
    eager: true,
  })
  item: Item;

  @Field()
  totalAmount: number = 0;

  @Field()
  @Column({ default: 1 })
  quantity: number;

  @Field(() => Cart)
  @ManyToOne(() => Cart, (cart) => cart.cartItems, {
    onDelete: "CASCADE",
  })
  cart: Cart;

  @Field()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @AfterLoad()
  afterLoadActions() {
    this.totalAmount = this.item.unitAmount * this.quantity;
  }
}
