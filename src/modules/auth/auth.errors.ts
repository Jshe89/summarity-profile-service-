import { GraphqlOutputError } from '@shared/errors/graphql-output.error';

export enum AUTH_ERRORS {
  AUTH_WRONG_CREDENTIALS = 'Wrong credentials',
  AUTH_UNAUTHORIZED = 'User unauthorized',
}
export type AUTH_ERRORS_TYPE = keyof typeof AUTH_ERRORS;
export class AuthError extends GraphqlOutputError<AUTH_ERRORS, AUTH_ERRORS_TYPE> {
  constructor(message: AUTH_ERRORS, type: AUTH_ERRORS_TYPE, data?: Record<string, any>) {
    super(message, type, data);

    Object.defineProperty(this, 'name', {
      value: 'AuthError',
      configurable: true
    });
    this.setCallerName(__filename);
  }
}

export class AuthWrongCredentialsError extends AuthError {
  constructor() {
    super(AUTH_ERRORS.AUTH_WRONG_CREDENTIALS, 'AUTH_WRONG_CREDENTIALS');
    Object.defineProperty(this, 'name', { value: 'AuthWrongCredentialsError' });
  }
}

export class AuthUnauthorizedError extends AuthError {
  constructor() {
    super(AUTH_ERRORS.AUTH_UNAUTHORIZED, 'AUTH_UNAUTHORIZED');
    Object.defineProperty(this, 'name', { value: 'AuthUnauthorizedError' });
  }
}

