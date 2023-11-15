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
exports.ContactsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const error_interceptor_1 = require("../../shared/interceptors/error.interceptor");
const contacts_service_1 = require("./contacts.service");
const profile_contacts_output_1 = require("./dto/profile-contacts.output");
const delete_contact_output_1 = require("./dto/delete-contact.output");
let ContactsResolver = class ContactsResolver {
    constructor(contactsService) {
        this.contactsService = contactsService;
    }
    profileContacts(id) {
        return this.contactsService.getProfileContacts(id);
    }
    myProfileContacts(user) {
        return this.contactsService.getProfileContacts(user.id);
    }
    deleteContact(contactId) {
        return this.contactsService.removeContact(contactId);
    }
};
exports.ContactsResolver = ContactsResolver;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Query)(() => profile_contacts_output_1.ProfileContactsUnionOutput),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContactsResolver.prototype, "profileContacts", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Query)(() => profile_contacts_output_1.ProfileContactsUnionOutput),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContactsResolver.prototype, "myProfileContacts", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Mutation)(() => delete_contact_output_1.DeleteContactUnionOutput),
    __param(0, (0, graphql_1.Args)('contactId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContactsResolver.prototype, "deleteContact", null);
exports.ContactsResolver = ContactsResolver = __decorate([
    (0, common_1.UseInterceptors)(error_interceptor_1.ErrorInterceptor),
    (0, graphql_1.Resolver)(() => profile_contacts_output_1.ProfileContactsUnionOutput),
    __metadata("design:paramtypes", [contacts_service_1.ContactsService])
], ContactsResolver);
//# sourceMappingURL=contacts.resolver.js.map