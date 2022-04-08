import { Field, ObjectType } from "type-graphql";
import {
  AfterLoad,
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Cart } from "./cart";
import { Item } from "./item";
import { Order } from "./order";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  stripeId: string;

  @Field(() => Cart)
  activeCart: Cart;

  @Field(() => [Cart], { nullable: true })
  @OneToMany(() => Cart, (cart) => cart.user, { nullable: true })
  carts: Cart[];

  @Field(() => [Order], { nullable: true })
  @OneToMany(() => Order, (order) => order.user, { nullable: true })
  orders: Order[];

  @Field()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @AfterLoad()
  async aferLoadActions() {
    const activeCart = await Cart.findOne({
      where: {
        userId: this.id,
        active: true,
      },
    });

    this.activeCart = activeCart!;
  }
}
