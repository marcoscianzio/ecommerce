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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeQuery = void 0;
const stripe_1 = require("../../stripe");
const type_graphql_1 = require("type-graphql");
const user_1 = require("../../entity/user");
const order_1 = require("../../entity/order");
const cart_1 = require("../../entity/cart");
const isAuth_1 = require("../../middleware/isAuth");
let StripeQuery = class StripeQuery {
    async checkoutSuccess(sessionId, { req }) {
        const user = await user_1.User.findOne(req.session.userId);
        if (!user) {
            throw new Error("user not found");
        }
        const session = await stripe_1.stripe.checkout.sessions.retrieve(sessionId, {
            expand: ["line_items"],
        });
        if (!user.stripeId) {
            const customer = await stripe_1.stripe.customers.retrieve(session.customer);
            user.stripeId = customer.id;
            await user.save();
        }
        await order_1.Order.create({
            userId: req.session.userId,
            cartId: req.session.cartId,
            stripeId: session.id,
        }).save();
        await cart_1.Cart.update(req.session.cartId, {
            active: false,
        });
        const cart = await cart_1.Cart.create({ userId: req.session.userId }).save();
        req.session.cartId = cart.id;
        return user;
    }
};
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Query)(() => user_1.User),
    __param(0, (0, type_graphql_1.Arg)("sessionId")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StripeQuery.prototype, "checkoutSuccess", null);
StripeQuery = __decorate([
    (0, type_graphql_1.Resolver)()
], StripeQuery);
exports.StripeQuery = StripeQuery;
//# sourceMappingURL=stripe.js.map