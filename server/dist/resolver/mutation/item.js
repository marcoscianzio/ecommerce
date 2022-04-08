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
exports.ItemMutation = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const image_1 = require("../../entity/image");
const item_1 = require("../../entity/item");
const item_2 = require("../../inputs/item");
const isAuth_1 = require("../../middleware/isAuth");
const stripe_1 = require("../../stripe");
let ItemMutation = class ItemMutation {
    async createItem({ images, name, stock, description, unitAmount }) {
        const imagesArray = new Array(0);
        if (images) {
            images.forEach(async (x, y) => {
                const image = new image_1.Image();
                image.url = x.url;
                imagesArray.push(image);
                await (0, typeorm_1.getConnection)().manager.save(image);
            });
        }
        const product = await stripe_1.stripe.products.create({
            name,
        });
        return await (0, typeorm_1.getConnection)().manager.save(item_1.Item, {
            images: imagesArray,
            stripeId: product.id,
            name,
            stock,
            description,
            unitAmount,
        });
    }
    async deleteItem(id) {
        await item_1.Item.delete(id);
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => item_1.Item),
    __param(0, (0, type_graphql_1.Arg)("values")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [item_2.CreateItemInput]),
    __metadata("design:returntype", Promise)
], ItemMutation.prototype, "createItem", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemMutation.prototype, "deleteItem", null);
ItemMutation = __decorate([
    (0, type_graphql_1.Resolver)()
], ItemMutation);
exports.ItemMutation = ItemMutation;
//# sourceMappingURL=item.js.map