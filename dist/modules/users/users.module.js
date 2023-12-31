"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const blocked_users_module_1 = require("../blocked-users/blocked-users.module");
const users_service_1 = require("./users.service");
const users_resolver_1 = require("./users.resolver");
const user_repository_1 = require("./user.repository");
const user_entity_1 = require("./user.entity");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            config_1.ConfigModule,
            (0, common_1.forwardRef)(() => blocked_users_module_1.BlockedUsersModule)
        ],
        providers: [users_service_1.UsersService, users_resolver_1.UsersResolver, user_repository_1.UserRepository],
        exports: [users_service_1.UsersService, user_repository_1.UserRepository],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map