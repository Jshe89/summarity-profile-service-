"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactNotDeletedError = exports.ContactNotFoundError = exports.ContactsError = exports.CONTACTS_ERRORS = void 0;
const graphql_output_error_1 = require("../../shared/errors/graphql-output.error");
var CONTACTS_ERRORS;
(function (CONTACTS_ERRORS) {
    CONTACTS_ERRORS["CONTACT_NOT_FOUND"] = "Contact not found";
    CONTACTS_ERRORS["CONTACT_NOT_DELETED"] = "Contact with this id was not deleted";
})(CONTACTS_ERRORS || (exports.CONTACTS_ERRORS = CONTACTS_ERRORS = {}));
class ContactsError extends graphql_output_error_1.GraphqlOutputError {
    constructor(message, type, data) {
        super(message, type, data);
        Object.defineProperty(this, 'name', {
            value: 'ContactsError',
            configurable: true
        });
        this.setCallerName(__filename);
    }
}
exports.ContactsError = ContactsError;
class ContactNotFoundError extends ContactsError {
    constructor(data) {
        super(CONTACTS_ERRORS.CONTACT_NOT_FOUND, 'CONTACT_NOT_FOUND', data);
        Object.defineProperty(this, 'name', { value: 'ContactNotFoundError' });
    }
}
exports.ContactNotFoundError = ContactNotFoundError;
class ContactNotDeletedError extends ContactsError {
    constructor(data) {
        super(CONTACTS_ERRORS.CONTACT_NOT_DELETED, 'CONTACT_NOT_DELETED', data);
        Object.defineProperty(this, 'name', { value: 'ContactNotUpdatedError' });
    }
}
exports.ContactNotDeletedError = ContactNotDeletedError;
//# sourceMappingURL=contacts.errors.js.map