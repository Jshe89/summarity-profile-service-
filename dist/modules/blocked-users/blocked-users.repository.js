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
exports.BlockedUsersRepository = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../users/user.repository");
const blocked_user_entity_1 = require("./blocked-user.entity");
let BlockedUsersRepository = class BlockedUsersRepository {
    constructor(repository, userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }
    findByPairBlockedIds(initiatorId, blockedId) {
        return this.repository.findOneBy({ initiatorId, blockedId });
    }
    blockUser(initiatorId, blockedId) {
        return this.repository.save(this.repository.create({
            initiatorId,
            blockedId
        }));
    }
    async unblockUser(blockedUserId, authUserId) {
        const { affected } = await this.repository.delete({ blockedId: blockedUserId, initiatorId: authUserId });
        return !!affected;
    }
    findBlockedProfiles(userId) {
        return this.userRepository.getQueryBuilder('u')
            .innerJoin('BlockedUsers', 'b', `b.blockedId = u.id AND b.initiatorId = '${userId}'`)
            .getMany();
    }
};
exports.BlockedUsersRepository = BlockedUsersRepository;
exports.BlockedUsersRepository = BlockedUsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(blocked_user_entity_1.BlockedUser)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        user_repository_1.UserRepository])
], BlockedUsersRepository);
//# sourceMappingURL=blocked-users.repository.js.map