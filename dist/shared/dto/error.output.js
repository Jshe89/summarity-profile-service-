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
exports.createMiltipleUnionWithError = exports.createUnionWithError = exports.ErrorListOutput = exports.ErrorOutput = void 0;
const graphql_1 = require("@nestjs/graphql");
const _ = require("lodash");
let ErrorOutput = class ErrorOutput {
};
exports.ErrorOutput = ErrorOutput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ErrorOutput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ErrorOutput.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ErrorOutput.prototype, "type", void 0);
exports.ErrorOutput = ErrorOutput = __decorate([
    (0, graphql_1.ObjectType)()
], ErrorOutput);
let ErrorListOutput = class ErrorListOutput {
};
exports.ErrorListOutput = ErrorListOutput;
__decorate([
    (0, graphql_1.Field)(() => [ErrorOutput]),
    __metadata("design:type", Array)
], ErrorListOutput.prototype, "errors", void 0);
exports.ErrorListOutput = ErrorListOutput = __decorate([
    (0, graphql_1.ObjectType)()
], ErrorListOutput);
const createUnionWithError = (Entity) => (0, graphql_1.createUnionType)({
    name: `${Entity.name}Union`,
    types: () => [Entity, ErrorListOutput],
    resolveType(value) {
        if (value.errors) {
            return ErrorListOutput;
        }
        return Entity;
    },
});
exports.createUnionWithError = createUnionWithError;
const createMiltipleUnionWithError = (...entities) => (0, graphql_1.createUnionType)({
    name: `${_.upperFirst(_.camelCase(entities.map(e => e.name).join('_')))}`,
    types: () => [...entities, ErrorListOutput],
    resolveType(value) {
        if (value.errors) {
            return ErrorListOutput;
        }
        return entities;
    },
});
exports.createMiltipleUnionWithError = createMiltipleUnionWithError;
//# sourceMappingURL=error.output.js.map