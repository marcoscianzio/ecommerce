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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItem = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const cart_1 = require("./cart");
const item_1 = require("./item");
let CartItem = class CartItem extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.totalAmount = 0;
    }
    afterLoadActions() {
        this.totalAmount = this.item.unitAmount * this.quantity;
    }
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], CartItem.prototype, "cartId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], CartItem.prototype, "itemId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => item_1.Item),
    (0, typeorm_1.ManyToOne)(() => item_1.Item, (item) => item.cartItems, {
        eager: true,
    }),
    __metadata("design:type", item_1.Item)
], CartItem.prototype, "item", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], CartItem.prototype, "totalAmount", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], CartItem.prototype, "quantity", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => cart_1.Cart),
    (0, typeorm_1.ManyToOne)(() => cart_1.Cart, (cart) => cart.cartItems, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", cart_1.Cart)
], CartItem.prototype, "cart", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CartItem.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CartItem.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CartItem.prototype, "afterLoadActions", null);
CartItem = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], CartItem);
exports.CartItem = CartItem;
//# sourceMappingURL=cartItem.js.map