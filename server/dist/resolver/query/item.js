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
exports.ItemQuery = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const item_1 = require("../../entity/item");
const user_1 = require("../../entity/user");
let ItemQuery = class ItemQuery {
    async liked(item, { req }) {
        let liked;
        if (!req.session.userId) {
            return false;
        }
        const likes = await (0, typeorm_1.getConnection)()
            .createQueryBuilder()
            .relation(user_1.User, "favorites")
            .of(req.session.userId)
            .loadMany();
        console.log(likes);
        likes.length > 0
            ? likes.forEach((like) => {
                liked = like.id === item.id;
            })
            : (liked = false);
        return liked;
    }
    async items() {
        return await item_1.Item.find({
            where: {
                stock: (0, typeorm_1.Not)((0, typeorm_1.Equal)(0)),
            },
        });
    }
    async item(id) {
        const item = await item_1.Item.findOne({
            where: {
                id,
            },
        });
        if (!item) {
            return undefined;
        }
        return item;
    }
};
__decorate([
    (0, type_graphql_1.FieldResolver)(),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [item_1.Item, Object]),
    __metadata("design:returntype", Promise)
], ItemQuery.prototype, "liked", null);
__decorate([
    (0, type_graphql_1.Query)(() => [item_1.Item]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ItemQuery.prototype, "items", null);
__decorate([
    (0, type_graphql_1.Query)(() => item_1.Item, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemQuery.prototype, "item", null);
ItemQuery = __decorate([
    (0, type_graphql_1.Resolver)(item_1.Item)
], ItemQuery);
exports.ItemQuery = ItemQuery;
//# sourceMappingURL=item.js.map