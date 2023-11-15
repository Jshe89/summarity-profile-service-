import { GraphqlOutputError } from '@shared/errors/graphql-output.error';
export declare enum BLOCKED_USERS_ERRORS {
    SELF_BLOCK = "User can't block himself",
    USER_NOT_BLOCKED = "User with this id was not blocked",
    USER_NOT_UNBLOCKED = "User with this id was not unblocked",
    USER_HAS_ALREADY_BLOCKED = "User with this id has already blocked"
}
export type BLOCKED_USERS_ERRORS_TYPE = keyof typeof BLOCKED_USERS_ERRORS;
export declare class BlockedUsersError extends GraphqlOutputError<BLOCKED_USERS_ERRORS, BLOCKED_USERS_ERRORS_TYPE> {
    constructor(message: BLOCKED_USERS_ERRORS, type: BLOCKED_USERS_ERRORS_TYPE, data: Record<string, any>);
}
export declare class SelfBlockError extends BlockedUsersError {
    constructor(data: Record<string, any>);
}
export declare class UserNotBlockedError extends BlockedUsersError {
    constructor(data: Record<string, any>);
}
export declare class UserNotUnBlockedError extends BlockedUsersError {
    constructor(data: Record<string, any>);
}
export declare class UserAlreadyBlockedError extends BlockedUsersError {
    constructor(data: Record<string, any>);
}
