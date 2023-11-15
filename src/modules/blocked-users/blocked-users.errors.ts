import { GraphqlOutputError } from '@shared/errors/graphql-output.error';

export enum BLOCKED_USERS_ERRORS {
  SELF_BLOCK = 'User can\'t block himself',
  USER_NOT_BLOCKED = 'User with this id was not blocked',
  USER_NOT_UNBLOCKED = 'User with this id was not unblocked',
  USER_HAS_ALREADY_BLOCKED = 'User with this id has already blocked',
}

export type BLOCKED_USERS_ERRORS_TYPE = keyof typeof BLOCKED_USERS_ERRORS;

export class BlockedUsersError extends GraphqlOutputError<BLOCKED_USERS_ERRORS, BLOCKED_USERS_ERRORS_TYPE> {
  constructor(message: BLOCKED_USERS_ERRORS, type: BLOCKED_USERS_ERRORS_TYPE, data: Record<string, any>) {
    super(message, type, data);

    Object.defineProperty(this, 'name', {
      value: 'BlockedUsersError',
      configurable: true
    });
    this.setCallerName(__filename);
  }
}

export class SelfBlockError extends BlockedUsersError {
  constructor(data: Record<string, any>) {
    super(BLOCKED_USERS_ERRORS.SELF_BLOCK, 'SELF_BLOCK', data);

    Object.defineProperty(this, 'name', { value: 'SelfBlockError' });
  }
}

export class UserNotBlockedError extends BlockedUsersError {
  constructor(data: Record<string, any>) {
    super(BLOCKED_USERS_ERRORS.USER_NOT_BLOCKED, 'USER_NOT_BLOCKED', data);

    Object.defineProperty(this, 'name', { value: 'UserNotBlockedError' });
  }
}

export class UserNotUnBlockedError extends BlockedUsersError {
  constructor(data: Record<string, any>) {
    super(BLOCKED_USERS_ERRORS.USER_NOT_UNBLOCKED, 'USER_NOT_UNBLOCKED', data);

    Object.defineProperty(this, 'name', { value: 'UserNotUnBlockedError' });
  }
}

export class UserAlreadyBlockedError extends BlockedUsersError {
  constructor(data: Record<string, any>) {
    super(BLOCKED_USERS_ERRORS.USER_HAS_ALREADY_BLOCKED, 'USER_HAS_ALREADY_BLOCKED', data);

    Object.defineProperty(this, 'name', { value: 'UserAlreadyBlockedError' });
  }
}

