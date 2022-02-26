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
exports.Item = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const cartItem_1 = require("./cartItem");
const image_1 = require("./image");
const user_1 = require("./user");
let Item = class Item extends typeorm_1.BaseEntity {
    afterLoadFunctions() {
        this.available = this.stock !== 0;
    }
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Item.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Item.prototype, "stripeId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Item.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Item.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Item.prototype, "available", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "float" }),
    __metadata("design:type", Number)
], Item.prototype, "unitAmount", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [image_1.Image]),
    (0, typeorm_1.OneToMany)(() => image_1.Image, (image) => image.item, {
        eager: true,
        cascade: true,
    }),
    __metadata("design:type", Array)
], Item.prototype, "images", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [user_1.User], { nullable: true }),
    (0, typeorm_1.ManyToMany)(() => user_1.User, (user) => user.favorites, {
        nullable: true,
    }),
    __metadata("design:type", Array)
], Item.prototype, "userFavorites", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Item.prototype, "stock", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Item.prototype, "liked", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [cartItem_1.CartItem]),
    (0, typeorm_1.OneToMany)(() => cartItem_1.CartItem, (cartItem) => cartItem.item),
    __metadata("design:type", Array)
], Item.prototype, "cartItems", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Item.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Item.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Item.prototype, "afterLoadFunctions", null);
Item = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Item);
exports.Item = Item;
//# sourceMappingURL=item.js.map