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
exports.ContactRepository = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../users/user.repository");
const contact_entity_1 = require("./contact.entity");
let ContactRepository = class ContactRepository {
    constructor(repository, userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }
    async createAndSave(input) {
        return this.repository.save(this.repository.create(input));
    }
    findUserContacts(userId) {
        return this.userRepository.getQueryBuilder('u')
            .where(`u.id != '${userId}'`)
            .leftJoinAndSelect('Contacts', 'c1', 'c1.requesterId = u.id')
            .leftJoinAndSelect('Contacts', 'c2', 'c2.recipientId = u.id')
            .where(`c1.recipientId='${userId}' OR c2.requesterId='${userId}'`)
            .getMany();
    }
    findById(contactId) {
        return this.repository.findOneBy({ id: contactId });
    }
    findByPairContactsId(userId1, userId2) {
        return this.repository.findOneBy([
            { requesterId: userId1, recipientId: userId2 },
            { requesterId: userId2, recipientId: userId1 }
        ]);
    }
    async removeContactById(contactId) {
        const { affected } = await this.repository.delete(contactId);
        return !!affected;
    }
};
exports.ContactRepository = ContactRepository;
exports.ContactRepository = ContactRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(contact_entity_1.Contact)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        user_repository_1.UserRepository])
], ContactRepository);
//# sourceMappingURL=contacts.repository.js.map