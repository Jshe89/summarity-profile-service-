import { GraphqlOutputError } from '@shared/errors/graphql-output.error';
export declare enum CONTACTS_ERRORS {
    CONTACT_NOT_FOUND = "Contact not found",
    CONTACT_NOT_DELETED = "Contact with this id was not deleted"
}
export type CONTACTS_ERRORS_TYPE = keyof typeof CONTACTS_ERRORS;
export declare class ContactsError extends GraphqlOutputError<CONTACTS_ERRORS, CONTACTS_ERRORS_TYPE> {
    constructor(message: CONTACTS_ERRORS, type: CONTACTS_ERRORS_TYPE, data: Record<string, any>);
}
export declare class ContactNotFoundError extends ContactsError {
    constructor(data: Record<string, any>);
}
export declare class ContactNotDeletedError extends ContactsError {
    constructor(data: Record<string, any>);
}
