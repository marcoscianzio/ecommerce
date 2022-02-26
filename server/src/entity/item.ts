import { Field, ObjectType } from "type-graphql";
import {
  AfterLoad,
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CartItem } from "./cartItem";
import { Image } from "./image";
import { User } from "./user";

@ObjectType()
@Entity()
export class Item extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  stripeId: string;

  @Field()
  @Column()
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field()
  available: boolean;

  @Field()
  @Column({ type: "float" })
  unitAmount: number;

  @Field(() => [Image])
  @OneToMany(() => Image, (image) => image.item, {
    eager: true,
    cascade: true,
  })
  images: Image[];

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (user) => user.favorites, {
    nullable: true,
  })
  userFavorites: User[];

  @Field()
  @Column()
  stock: number;

  @Field()
  liked: boolean;

  @Field(() => [CartItem])
  @OneToMany(() => CartItem, (cartItem) => cartItem.item)
  cartItems: CartItem[];

  @Field()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @AfterLoad()
  afterLoadFunctions() {
    this.available = this.stock !== 0;
  }
}
