import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Item } from "./item";

@ObjectType()
@Entity()
export class Image extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ type: "text" })
  url: string;

  @Field(() => Item)
  @ManyToOne(() => Item, (item) => item.images, {
    onDelete: "CASCADE",
  })
  item: Item;
}
