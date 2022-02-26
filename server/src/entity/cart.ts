import { Field, ObjectType } from "type-graphql";
import {
  AfterLoad,
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CartItem } from "./cartItem";
import { Order } from "./order";
import { User } from "./user";

@ObjectType()
@Entity()
export class Cart extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  userId: string;

  @Field()
  itemCount: number;

  @Field()
  total: number = 0;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @Field()
  @Column({ default: true })
  active: boolean;

  @Field(() => [CartItem], { nullable: true })
  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  cartItems: CartItem[];

  @Field()
  readyForCheckout: boolean;

  @Field(() => Order, { nullable: true })
  @OneToOne(() => Order, (order) => order.cart, { nullable: true })
  order: Order;

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
    this.cartItems.forEach((cartItem) => {
      this.total = this.total + cartItem.totalAmount;
    });

    this.readyForCheckout = this.cartItems.length > 0;
  }
}
