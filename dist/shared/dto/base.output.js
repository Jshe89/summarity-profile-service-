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
exports.createMultipleUnion = exports.BaseOutput = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_scalars_1 = require("graphql-scalars");
const _ = require("lodash");
let BaseOutput = class BaseOutput {
};
exports.BaseOutput = BaseOutput;
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], BaseOutput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_scalars_1.GraphQLDateTime, { nullable: false }),
    __metadata("design:type", Date)
], BaseOutput.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_scalars_1.GraphQLDateTime, { nullable: false }),
    __metadata("design:type", Date)
], BaseOutput.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_scalars_1.GraphQLDateTime, { nullable: true }),
    __metadata("design:type", Date)
], BaseOutput.prototype, "deletedAt", void 0);
exports.BaseOutput = BaseOutput = __decorate([
    (0, graphql_1.ObjectType)()
], BaseOutput);
const createMultipleUnion = (...entities) => (0, graphql_1.createUnionType)({
    name: `${_.upperFirst(_.camelCase(entities.map(e => e.name).join('_')))}Union`,
    types: () => [...entities]
});
exports.createMultipleUnion = createMultipleUnion;
//# sourceMappingURL=base.output.js.map