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
exports.ProfileContactsUnionOutput = exports.ProfileContactsOutput = void 0;
const graphql_1 = require("@nestjs/graphql");
const error_output_1 = require("../../../shared/dto/error.output");
const profile_output_1 = require("../../users/dto/profile.output");
let ProfileContactsOutput = class ProfileContactsOutput {
};
exports.ProfileContactsOutput = ProfileContactsOutput;
__decorate([
    (0, graphql_1.Field)(() => [profile_output_1.ProfileOutput]),
    __metadata("design:type", Array)
], ProfileContactsOutput.prototype, "contacts", void 0);
exports.ProfileContactsOutput = ProfileContactsOutput = __decorate([
    (0, graphql_1.ObjectType)()
], ProfileContactsOutput);
exports.ProfileContactsUnionOutput = (0, error_output_1.createUnionWithError)(ProfileContactsOutput);
//# sourceMappingURL=profile-contacts.output.js.map