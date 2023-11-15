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
exports.Contact = exports.CONTACT_STATUS_TYPES = void 0;
const typeorm_1 = require("typeorm");
const db_tables_config_1 = require("../../config/db-tables.config");
const base_entity_1 = require("../../shared/base/base.entity");
const user_entity_1 = require("../users/user.entity");
var CONTACT_STATUS_TYPES;
(function (CONTACT_STATUS_TYPES) {
    CONTACT_STATUS_TYPES[CONTACT_STATUS_TYPES["REQUESTED"] = 0] = "REQUESTED";
    CONTACT_STATUS_TYPES[CONTACT_STATUS_TYPES["ACCEPTED"] = 1] = "ACCEPTED";
})(CONTACT_STATUS_TYPES || (exports.CONTACT_STATUS_TYPES = CONTACT_STATUS_TYPES = {}));
let Contact = class Contact extends base_entity_1.Base {
};
exports.Contact = Contact;
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], Contact.prototype, "requester", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contact.prototype, "requesterId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], Contact.prototype, "recipient", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contact.prototype, "recipientId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: CONTACT_STATUS_TYPES,
        default: CONTACT_STATUS_TYPES.REQUESTED
    }),
    __metadata("design:type", Number)
], Contact.prototype, "status", void 0);
exports.Contact = Contact = __decorate([
    (0, typeorm_1.Entity)(db_tables_config_1.DB_TABLE_NAMES.CONTACTS)
], Contact);
//# sourceMappingURL=contact.entity.js.map