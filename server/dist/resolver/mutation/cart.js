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
exports.CartResolver = void 0;
const cart_1 = require("../../entity/cart");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const cartItem_1 = require("../../entity/cartItem");
const item_1 = require("../../entity/item");
const isAuth_1 = require("../../middleware/isAuth");
let CartResolver = class CartResolver {
    async createCart({ req }) {
        const cart = await cart_1.Cart.create({
            userId: req.session.userId,
        }).save();
        req.session.cartId = cart.id;
        return cart;
    }
    async addItemToCart(itemId, { req }) {
        const cartId = req.session.cartId;
        const item = await item_1.Item.findOne({ id: itemId });
        if (!item) {
            throw new Error("the item wasn't found");
        }
        if (item.available) {
            try {
                await cartItem_1.CartItem.insert({
                    cartId,
                    itemId,
                });
            }
            catch (error) {
                await (0, typeorm_1.getConnection)().manager.increment(cartItem_1.CartItem, { cartId, itemId }, "quantity", 1);
                await (0, typeorm_1.getConnection)().manager.decrement(item_1.Item, { id: itemId }, "stock", 1);
            }
        }
        else {
            return false;
        }
        return true;
    }
    async removeItemFromCart(itemId, whole, { req }) {
        const cartId = req.session.cartId;
        const cartItem = await cartItem_1.CartItem.findOne({ cartId, itemId });
        if ((cartItem === null || cartItem === void 0 ? void 0 : cartItem.quantity) !== 1 && !whole) {
            await (0, typeorm_1.getConnection)().manager.decrement(cartItem_1.CartItem, { cartId, itemId }, "quantity", 1);
        }
        else {
            await cartItem_1.CartItem.delete({ cartId, itemId });
        }
        await (0, typeorm_1.getConnection)().manager.increment(item_1.Item, { id: itemId }, "stock", 1);
        return true;
    }
};
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Mutation)(() => cart_1.Cart),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartResolver.prototype, "createCart", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("itemId")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CartResolver.prototype, "addItemToCart", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("itemId")),
    __param(1, (0, type_graphql_1.Arg)("whole", () => Boolean, { nullable: true, defaultValue: false })),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean, Object]),
    __metadata("design:returntype", Promise)
], CartResolver.prototype, "removeItemFromCart", null);
CartResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], CartResolver);
exports.CartResolver = CartResolver;
//# sourceMappingURL=cart.js.map