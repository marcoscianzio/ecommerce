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
exports.StripeMutation = void 0;
const type_graphql_1 = require("type-graphql");
const cart_1 = require("../../entity/cart");
const user_1 = require("../../entity/user");
const isAuth_1 = require("../../middleware/isAuth");
const stripe_1 = require("../../stripe");
let StripeMutation = class StripeMutation {
    async createCheckoutSession({ req }) {
        const user = await user_1.User.findOne(req.session.userId);
        const cart = await cart_1.Cart.findOne(req.session.cartId);
        if (cart.itemCount === 0) {
            throw new Error("you must add at least one item to the cart");
        }
        const session = await stripe_1.stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            customer_email: user.stripeId ? undefined : user.email,
            customer: user.stripeId || undefined,
            line_items: cart === null || cart === void 0 ? void 0 : cart.cartItems.map((item) => {
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: item.item.name,
                        },
                        unit_amount: Math.round(item.item.unitAmount * 100),
                    },
                    quantity: item.quantity,
                };
            }),
            mode: "payment",
            cancel_url: "http://localhost:3000/cancel",
            success_url: "http://localhost:3000/success/{CHECKOUT_SESSION_ID}",
        });
        const url = session.url;
        return url;
    }
};
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StripeMutation.prototype, "createCheckoutSession", null);
StripeMutation = __decorate([
    (0, type_graphql_1.Resolver)()
], StripeMutation);
exports.StripeMutation = StripeMutation;
//# sourceMappingURL=stripe.js.map