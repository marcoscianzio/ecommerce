import "reflect-metadata";
import "dotenv/config";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import session from "express-session";
import cors from "cors";
import { Context } from "./types";
import connectRedis from "connect-redis";
import Redis from "ioredis";

const RedisStore = connectRedis(session);
const redisClient = new Redis();

const main = async () => {
  await createConnection();

  const app = express();

  app.set("trust proxy", true);

  app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
    })
  );

  app.use(
    session({
      secret: "dfsjsdjfsdjfdjsfdgfd",
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      name: "qid",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 100 * 60 * 60 * 24 * 365 * 1000,
        sameSite: "none",
        secure: true,
        httpOnly: true,
      },
    })
  );

  app.use((req, _, next) => {
    const isLocalhost = req.get("origin")?.toString().includes("localhost");
    if (isLocalhost) {
      req.session.cookie.secure = false;
      req.session.cookie.sameSite = "lax";
    }
    next();
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      resolvers: [__dirname + "/resolver/**/*.js"],
    }),
    context: ({ req, res }: Context) => ({ req, res }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    path: "/api",
    cors: false,
  });

  const PORT = process.env.port || 4000;
  app.listen(PORT, () => {
    console.log("app running on port " + PORT);
  });
};

main();
