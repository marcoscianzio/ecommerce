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
exports.Cart = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const cartItem_1 = require("./cartItem");
const order_1 = require("./order");
const user_1 = require("./user");
let Cart = class Cart extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.total = 0;
    }
    afterLoadActions() {
        this.cartItems.forEach((cartItem) => {
            this.total = this.total + cartItem.totalAmount;
        });
        this.readyForCheckout = this.cartItems.length > 0;
    }
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Cart.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Cart.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], Cart.prototype, "itemCount", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], Cart.prototype, "total", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => user_1.User),
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.carts),
    __metadata("design:type", user_1.User)
], Cart.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Cart.prototype, "active", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [cartItem_1.CartItem], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => cartItem_1.CartItem, (cartItem) => cartItem.cart, {
        nullable: true,
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], Cart.prototype, "cartItems", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Cart.prototype, "readyForCheckout", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => order_1.Order, { nullable: true }),
    (0, typeorm_1.OneToOne)(() => order_1.Order, (order) => order.cart, { nullable: true }),
    __metadata("design:type", order_1.Order)
], Cart.prototype, "order", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Cart.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Cart.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Cart.prototype, "afterLoadActions", null);
Cart = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Cart);
exports.Cart = Cart;
//# sourceMappingURL=cart.js.map