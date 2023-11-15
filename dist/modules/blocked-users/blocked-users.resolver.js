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
exports.BlockedUsersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const error_interceptor_1 = require("../../shared/interceptors/error.interceptor");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const blocked_users_service_1 = require("./blocked-users.service");
const blocked_users_output_1 = require("./dto/blocked-users.output");
const unblocked_users_output_1 = require("./dto/unblocked-users.output");
const my_blocked_users_output_1 = require("./dto/my-blocked-users.output");
let BlockedUsersResolver = class BlockedUsersResolver {
    constructor(blockedUsersService) {
        this.blockedUsersService = blockedUsersService;
    }
    blockProfile(profileId, user) {
        return this.blockedUsersService.blockUser(profileId, user.id);
    }
    unblockProfile(profileId, user) {
        return this.blockedUsersService.unblockUser(profileId, user.id);
    }
    myBlockedProfiles(user) {
        return this.blockedUsersService.getBlockedProfiles(user.id);
    }
};
exports.BlockedUsersResolver = BlockedUsersResolver;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Mutation)(() => blocked_users_output_1.BlockedUsersUnionOutput),
    __param(0, (0, graphql_1.Args)('profileId')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BlockedUsersResolver.prototype, "blockProfile", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Mutation)(() => unblocked_users_output_1.UnblockedUsersUnionOutput),
    __param(0, (0, graphql_1.Args)('profileId')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BlockedUsersResolver.prototype, "unblockProfile", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Query)(() => my_blocked_users_output_1.MyBlockedUsersUnionOutput),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlockedUsersResolver.prototype, "myBlockedProfiles", null);
exports.BlockedUsersResolver = BlockedUsersResolver = __decorate([
    (0, common_1.UseInterceptors)(error_interceptor_1.ErrorInterceptor),
    (0, graphql_1.Resolver)(() => blocked_users_output_1.BlockedUsersUnionOutput),
    __metadata("design:paramtypes", [blocked_users_service_1.BlockedUsersService])
], BlockedUsersResolver);
//# sourceMappingURL=blocked-users.resolver.js.map