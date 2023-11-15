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
exports.UsersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const error_interceptor_1 = require("../../shared/interceptors/error.interceptor");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const blocked_users_service_1 = require("../blocked-users/blocked-users.service");
const users_service_1 = require("./users.service");
const profile_output_1 = require("./dto/profile.output");
const update_profile_input_1 = require("./dto/update-profile.input");
const my_profile_output_1 = require("./dto/my-profile.output");
const profile_search_output_1 = require("./dto/profile-search.output");
let UsersResolver = class UsersResolver {
    constructor(usersService, blockedUsersService) {
        this.usersService = usersService;
        this.blockedUsersService = blockedUsersService;
    }
    profileById(id) {
        return this.usersService.getUserByIdOrFail(id);
    }
    myProfile(user) {
        return this.usersService.getUserByIdOrFail(user.id);
    }
    updateMyProfile(input, user) {
        return this.usersService.updateUserById(user.id, input);
    }
    isBlocked(user, authUser) {
        return this.blockedUsersService.isUserBlocked(user.id, authUser.id);
    }
    profileSearch(query, user) {
        return this.usersService.getProfiles(query, user.id);
    }
};
exports.UsersResolver = UsersResolver;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Query)(() => profile_output_1.ProfileUnionOutput),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "profileById", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Query)(() => my_profile_output_1.MyProfileUnionOutput),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "myProfile", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Mutation)(() => my_profile_output_1.MyProfileUnionOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_profile_input_1.UpdateProfileInput, Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateMyProfile", null);
__decorate([
    (0, graphql_1.ResolveField)('isBlocked', () => Boolean),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [profile_output_1.ProfileOutput, Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "isBlocked", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Query)(() => profile_search_output_1.ProfileSearchUnionOutput),
    __param(0, (0, graphql_1.Args)('query')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "profileSearch", null);
exports.UsersResolver = UsersResolver = __decorate([
    (0, common_1.UseInterceptors)(error_interceptor_1.ErrorInterceptor),
    (0, graphql_1.Resolver)(() => profile_output_1.ProfileOutput),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        blocked_users_service_1.BlockedUsersService])
], UsersResolver);
//# sourceMappingURL=users.resolver.js.map