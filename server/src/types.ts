import { Request } from "express";
import { Session } from "express-session";

export type Context = {
  req: Request & {
    session: Session & {
      userId: string;
      cartId: string;
    };
  };
  res: Response;
};
