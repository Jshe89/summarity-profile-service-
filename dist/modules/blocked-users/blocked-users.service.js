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
exports.BlockedUsersService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const contacts_repository_1 = require("../contacts/contacts.repository");
const blocked_users_repository_1 = require("./blocked-users.repository");
const blocked_users_errors_1 = require("./blocked-users.errors");
let BlockedUsersService = class BlockedUsersService {
    constructor(blockedUsersRepository, contactsRepository, usersService) {
        this.blockedUsersRepository = blockedUsersRepository;
        this.contactsRepository = contactsRepository;
        this.usersService = usersService;
    }
    async blockUser(blockedUserId, authUserId) {
        if (authUserId === blockedUserId) {
            throw new blocked_users_errors_1.SelfBlockError({ blockedUserId });
        }
        const blockedUser = await this.blockedUsersRepository.findByPairBlockedIds(authUserId, blockedUserId);
        if (blockedUser) {
            throw new blocked_users_errors_1.UserAlreadyBlockedError({ blockedUserId });
        }
        const user = await this.usersService.getUserByIdOrFail(blockedUserId);
        try {
            await this.blockedUsersRepository.blockUser(authUserId, user.id);
            const contact = await this.contactsRepository.findByPairContactsId(authUserId, user.id);
            if (contact) {
                await this.contactsRepository.removeContactById(contact.id);
            }
            return { blocked: true };
        }
        catch (error) {
            throw new blocked_users_errors_1.UserNotBlockedError({ blockedUserId });
        }
    }
    async unblockUser(blockedUserId, authUserId) {
        await this.usersService.getUserByIdOrFail(blockedUserId);
        const blockedUser = await this.blockedUsersRepository.findByPairBlockedIds(authUserId, blockedUserId);
        if (!blockedUser) {
            throw new blocked_users_errors_1.UserNotBlockedError({ blockedUserId });
        }
        try {
            const unblocked = await this.blockedUsersRepository.unblockUser(blockedUserId, authUserId);
            return { unblocked };
        }
        catch (error) {
            throw new blocked_users_errors_1.UserNotUnBlockedError({ blockedUserId });
        }
    }
    async getBlockedProfiles(authUserId) {
        await this.usersService.getUserByIdOrFail(authUserId);
        const blockedUsers = await this.blockedUsersRepository.findBlockedProfiles(authUserId);
        return { blockedUsers };
    }
    async isUserBlocked(blockedUserId, authUserId) {
        const blockedUser = await this.blockedUsersRepository.findByPairBlockedIds(authUserId, blockedUserId);
        return !!blockedUser;
    }
};
exports.BlockedUsersService = BlockedUsersService;
exports.BlockedUsersService = BlockedUsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [blocked_users_repository_1.BlockedUsersRepository,
        contacts_repository_1.ContactRepository,
        users_service_1.UsersService])
], BlockedUsersService);
//# sourceMappingURL=blocked-users.service.js.map