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
exports.CartQuery = void 0;
const isAuth_1 = require("../../middleware/isAuth");
const type_graphql_1 = require("type-graphql");
const cart_1 = require("../../entity/cart");
let CartQuery = class CartQuery {
    itemCount(cart) {
        let count = 0;
        cart.cartItems.forEach((x) => {
            count = count + x.quantity;
        });
        return count;
    }
    async myCart({ req }) {
        const cart = await cart_1.Cart.findOne(req.session.cartId);
        if (!cart) {
            return undefined;
        }
        return cart;
    }
    async carts() {
        return await cart_1.Cart.find();
    }
};
__decorate([
    (0, type_graphql_1.FieldResolver)(),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cart_1.Cart]),
    __metadata("design:returntype", Number)
], CartQuery.prototype, "itemCount", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Query)(() => cart_1.Cart, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartQuery.prototype, "myCart", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Query)(() => [cart_1.Cart]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CartQuery.prototype, "carts", null);
CartQuery = __decorate([
    (0, type_graphql_1.Resolver)(cart_1.Cart)
], CartQuery);
exports.CartQuery = CartQuery;
//# sourceMappingURL=cart.js.map