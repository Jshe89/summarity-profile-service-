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
exports.UserRepository = void 0;
const typeorm_1 = require("typeorm");
const bcrypt_1 = require("bcrypt");
const typeorm_2 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./user.entity");
let UserRepository = class UserRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async createAndSave(userInput) {
        const { password, ...input } = userInput;
        const passwordHash = await (0, bcrypt_1.hash)(password, 10);
        return this.repository.save(this.repository.create({
            passwordHash,
            ...input
        }));
    }
    findById(id) {
        return this.repository.findOneBy({ id });
    }
    async updateById(id, input) {
        const userToSave = await this.repository.findOneBy({ id });
        return this.repository.save({
            id,
            ...userToSave,
            ...input,
        });
    }
    findByEmail(email) {
        return this.repository.findOneBy({ email });
    }
    getQueryBuilder(alias = 'u') {
        return this.repository.createQueryBuilder(alias);
    }
    getUserProfiles(query, userId) {
        const blockedUsersSubQuery = this.repository.createQueryBuilder('blockedUsers')
            .where('blockedUser.blockedId = :blockedId', { blockedId: userId });
        return this.repository.createQueryBuilder('u')
            .leftJoinAndSelect('Contacts', 'c1', `c1.requesterId = u.id AND c1.recipientId = '${userId}'`)
            .leftJoinAndSelect('Contacts', 'c2', `c2.recipientId = u.id AND c2.requesterId = '${userId}'`)
            .where('user.id NOT IN (:blockedId)', {
            blockedId: blockedUsersSubQuery,
        })
            .andWhere('(u.firstName LIKE :query OR u.lastName LIKE :query)', { query: `%${query}%` })
            .orderBy({ 'с1.id': 'DESC', 'с2.id': 'DESC' })
            .orderBy({ 'u.firstName': 'ASC', 'u.lastName': 'ASC' })
            .getMany();
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserRepository);
//# sourceMappingURL=user.repository.js.map