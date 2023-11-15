import { GraphqlOutputError } from '@shared/errors/graphql-output.error';

export enum USER_ERRORS {
  USER_ALREADY_EXISTS = 'User with this email already exists',
  USER_NOT_FOUND = 'User not found',
  USER_NOT_UPDATED = 'User with this id was not updated',
}
export type USER_ERRORS_TYPE = keyof typeof USER_ERRORS;
export class UserError extends GraphqlOutputError<USER_ERRORS, USER_ERRORS_TYPE> {
  constructor(message: USER_ERRORS, type: USER_ERRORS_TYPE, data: Record<string, any>) {
    super(message, type, data);

    Object.defineProperty(this, 'name', {
      value: 'UserError',
      configurable: true
    });
    this.setCallerName(__filename);
  }
}

export class UserAlreadyExistsError extends UserError {
  constructor(data: Record<string, any>) {
    super(USER_ERRORS.USER_ALREADY_EXISTS, 'USER_ALREADY_EXISTS', data);
    Object.defineProperty(this, 'name', { value: 'UserAlreadyExistsError' });
  }
}

export class UserNotFoundError extends UserError {
  constructor(data: Record<string, any>) {
    super(USER_ERRORS.USER_NOT_FOUND, 'USER_NOT_FOUND', data);

    Object.defineProperty(this, 'name', { value: 'UserNotFoundError' });
  }
}

export class UserNotUpdatedError extends UserError {
  constructor(data: Record<string, any>) {
    super(USER_ERRORS.USER_NOT_UPDATED, 'USER_NOT_UPDATED', data);

    Object.defineProperty(this, 'name', { value: 'UserNotUpdatedError' });
  }
}
