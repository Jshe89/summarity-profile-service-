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
exports.LoginUnionOutput = exports.LoginOutput = void 0;
const graphql_1 = require("@nestjs/graphql");
const error_output_1 = require("../../../shared/dto/error.output");
const my_profile_output_1 = require("../../users/dto/my-profile.output");
let LoginOutput = class LoginOutput {
};
exports.LoginOutput = LoginOutput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LoginOutput.prototype, "accessToken", void 0);
__decorate([
    (0, graphql_1.Field)(() => my_profile_output_1.MyProfileOutput),
    __metadata("design:type", my_profile_output_1.MyProfileOutput)
], LoginOutput.prototype, "profile", void 0);
exports.LoginOutput = LoginOutput = __decorate([
    (0, graphql_1.ObjectType)()
], LoginOutput);
exports.LoginUnionOutput = (0, error_output_1.createUnionWithError)(LoginOutput);
//# sourceMappingURL=login.output.js.map