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
exports.User = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const cart_1 = require("./cart");
const item_1 = require("./item");
const order_1 = require("./order");
let User = class User extends typeorm_1.BaseEntity {
    async aferLoadActions() {
        const activeCart = await cart_1.Cart.findOne({
            where: {
                userId: this.id,
                active: true,
            },
        });
        this.activeCart = activeCart;
    }
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "stripeId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [item_1.Item], { nullable: true }),
    (0, typeorm_1.ManyToMany)(() => item_1.Item, (item) => item.userFavorites, {
        nullable: true,
    }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "favorites", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => cart_1.Cart),
    __metadata("design:type", cart_1.Cart)
], User.prototype, "activeCart", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [cart_1.Cart], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => cart_1.Cart, (cart) => cart.user, { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "carts", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [order_1.Order], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => order_1.Order, (order) => order.user, { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "orders", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "aferLoadActions", null);
User = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=user.js.map