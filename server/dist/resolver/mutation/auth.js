"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMutation = void 0;
const user_1 = require("../../entity/user");
const type_graphql_1 = require("type-graphql");
const auth_1 = require("../../inputs/auth");
const bcrypt_1 = __importDefault(require("bcrypt"));
const cart_1 = require("../../entity/cart");
let FieldError = class FieldError {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], FieldError.prototype, "message", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
FieldError = __decorate([
    (0, type_graphql_1.ObjectType)()
], FieldError);
let UserResponse = class UserResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => user_1.User, { nullable: true }),
    __metadata("design:type", user_1.User)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserResponse);
let AuthMutation = class AuthMutation {
    async register({ email, password }, { req }) {
        const userAlreadyExists = await user_1.User.findOne({ email });
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
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const userCreated = await user_1.User.create({
            email,
            password: hashedPassword,
        }).save();
        const cart = await cart_1.Cart.create({ userId: userCreated.id }).save();
        const user = await user_1.User.findOne({ email });
        req.session.cartId = cart.id;
        req.session.userId = user.id;
        return { user };
    }
    async login({ email, password }, { req }) {
        const user = await user_1.User.findOne({ email });
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
        const correctPassword = await bcrypt_1.default.compare(password, user.password);
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
        const cart = await cart_1.Cart.findOne({
            where: { userId: user.id, active: true },
        });
        req.session.userId = user.id;
        req.session.cartId = cart.id;
        return { user };
    }
    async logout({ req, res }) {
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
};
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)("values")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_1.UserInput, Object]),
    __metadata("design:returntype", Promise)
], AuthMutation.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)("values")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_1.UserInput, Object]),
    __metadata("design:returntype", Promise)
], AuthMutation.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthMutation.prototype, "logout", null);
AuthMutation = __decorate([
    (0, type_graphql_1.Resolver)(user_1.User)
], AuthMutation);
exports.AuthMutation = AuthMutation;
//# sourceMappingURL=auth.js.map