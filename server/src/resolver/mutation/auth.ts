import { User } from "../../entity/user";
import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import { UserInput } from "../../inputs/auth";
import bcrypt from "bcrypt";
import { Context } from "../../types";
import { Cart } from "../../entity/cart";

@ObjectType()
class FieldError {
  @Field(() => String)
  message: string;

  @Field(() => String)
  field: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class AuthMutation {
  @Mutation(() => UserResponse)
  async register(
    @Arg("values") { email, password }: UserInput,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return {
        errors: [
          {
            field: "email",
            message: "email is already registered",
          },
        ],
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userCreated = await User.create({
      email,
      password: hashedPassword,
    }).save();

    const cart = await Cart.create({ userId: userCreated.id }).save();

    const user = await User.findOne({ email });

    req.session.cartId = cart.id;
    req.session.userId = user!.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("values") { email, password }: UserInput,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    const user = await User.findOne({ email });

    if (!user) {
      return {
        errors: [
          {
            message: "email doesn't exist",
            field: "email",
          },
        ],
      };
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return {
        errors: [
          {
            message: "invalid password",
            field: "password",
          },
        ],
      };
    }

    const cart = await Cart.findOne({
      where: { userId: user.id, active: true },
    });

    req.session.userId = user.id;
    req.session.cartId = cart!.id;

    return { user };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: Context): Promise<Boolean> {
    return new Promise((res) => {
      req.session.destroy((err) => {
        if (err) {
          res(false);
          return;
        }
        res(true);
      });
    });
  }
}
