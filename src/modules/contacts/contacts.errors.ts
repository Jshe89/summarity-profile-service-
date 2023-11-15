import { GraphqlOutputError } from '@shared/errors/graphql-output.error';

export enum CONTACTS_ERRORS {
  CONTACT_NOT_FOUND = 'Contact not found',
  CONTACT_NOT_DELETED = 'Contact with this id was not deleted',
}

export type CONTACTS_ERRORS_TYPE = keyof typeof CONTACTS_ERRORS;

export class ContactsError extends GraphqlOutputError<CONTACTS_ERRORS, CONTACTS_ERRORS_TYPE> {
  constructor(message: CONTACTS_ERRORS, type: CONTACTS_ERRORS_TYPE, data: Record<string, any>) {
    super(message, type, data);

    Object.defineProperty(this, 'name', {
      value: 'ContactsError',
      configurable: true
    });
    this.setCallerName(__filename);
  }
}

export class ContactNotFoundError extends ContactsError {
  constructor(data: Record<string, any>) {
    super(CONTACTS_ERRORS.CONTACT_NOT_FOUND, 'CONTACT_NOT_FOUND', data);

    Object.defineProperty(this, 'name', { value: 'ContactNotFoundError' });
  }
}

export class ContactNotDeletedError extends ContactsError {
  constructor(data: Record<string, any>) {
    super(CONTACTS_ERRORS.CONTACT_NOT_DELETED, 'CONTACT_NOT_DELETED', data);

    Object.defineProperty(this, 'name', { value: 'ContactNotUpdatedError' });
  }
}
