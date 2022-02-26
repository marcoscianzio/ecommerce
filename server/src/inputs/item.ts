import { Field, InputType } from "type-graphql";

@InputType()
class ItemImage {
  @Field()
  url: string;
}

@InputType()
export class CreateItemInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  unitAmount: number;

  @Field()
  stock: number;

  @Field(() => [ItemImage])
  images: ItemImage[];
}
