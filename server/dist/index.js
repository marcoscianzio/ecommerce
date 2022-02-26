"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const ioredis_1 = __importDefault(require("ioredis"));
const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
const redisClient = new ioredis_1.default();
const main = async () => {
    await (0, typeorm_1.createConnection)();
    const app = (0, express_1.default)();
    app.set("trust proxy", true);
    app.use((0, cors_1.default)({
        credentials: true,
        origin: ["http://localhost:3000", "https://studio.apollographql.com"],
    }));
    app.use((0, express_session_1.default)({
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
    }));
    app.use((req, _, next) => {
        var _a;
        const isLocalhost = (_a = req.get("origin")) === null || _a === void 0 ? void 0 : _a.toString().includes("localhost");
        if (isLocalhost) {
            req.session.cookie.secure = false;
            req.session.cookie.sameSite = "lax";
        }
        next();
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            validate: false,
            resolvers: [__dirname + "/resolver/**/*.js"],
        }),
        context: ({ req, res }) => ({ req, res }),
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
//# sourceMappingURL=index.js.map