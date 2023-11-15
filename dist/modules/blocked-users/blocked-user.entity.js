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
exports.BlockedUser = void 0;
const typeorm_1 = require("typeorm");
const db_tables_config_1 = require("../../config/db-tables.config");
const base_entity_1 = require("../../shared/base/base.entity");
const user_entity_1 = require("../users/user.entity");
let BlockedUser = class BlockedUser extends base_entity_1.Base {
};
exports.BlockedUser = BlockedUser;
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], BlockedUser.prototype, "initiator", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BlockedUser.prototype, "initiatorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], BlockedUser.prototype, "blocked", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BlockedUser.prototype, "blockedId", void 0);
exports.BlockedUser = BlockedUser = __decorate([
    (0, typeorm_1.Entity)(db_tables_config_1.DB_TABLE_NAMES.BLOCKED_USERS)
], BlockedUser);
//# sourceMappingURL=blocked-user.entity.js.map