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
exports.AuthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const error_interceptor_1 = require("../../shared/interceptors/error.interceptor");
const auth_service_1 = require("./auth.service");
const signup_input_1 = require("./dto/signup.input");
const signup_output_1 = require("./dto/signup.output");
const login_output_1 = require("./dto/login.output");
const login_input_1 = require("./dto/login.input");
let AuthResolver = class AuthResolver {
    constructor(authService) {
        this.authService = authService;
    }
    signup(input) {
        return this.authService.signup(input);
    }
    login(input) {
        return this.authService.login(input);
    }
};
exports.AuthResolver = AuthResolver;
__decorate([
    (0, graphql_1.Mutation)(() => signup_output_1.SignupUnionOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_input_1.SignupInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "signup", null);
__decorate([
    (0, graphql_1.Mutation)(() => login_output_1.LoginUnionOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_input_1.LoginInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
exports.AuthResolver = AuthResolver = __decorate([
    (0, common_1.UseInterceptors)(error_interceptor_1.ErrorInterceptor),
    (0, graphql_1.Resolver)(() => signup_output_1.SignupUnionOutput),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthResolver);
//# sourceMappingURL=auth.resolver.js.map