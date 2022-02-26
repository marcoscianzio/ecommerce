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
exports.UserQuery = void 0;
const type_graphql_1 = require("type-graphql");
const item_1 = require("../../entity/item");
const typeorm_1 = require("typeorm");
const user_1 = require("../../entity/user");
const isAuth_1 = require("../../middleware/isAuth");
let UserQuery = class UserQuery {
    async myFavorites({ req }) {
        return await (0, typeorm_1.getConnection)()
            .createQueryBuilder()
            .relation(user_1.User, "favorites")
            .of(req.session.userId)
            .loadMany();
    }
};
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Query)(() => [item_1.Item]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserQuery.prototype, "myFavorites", null);
UserQuery = __decorate([
    (0, type_graphql_1.Resolver)()
], UserQuery);
exports.UserQuery = UserQuery;
//# sourceMappingURL=user.js.map