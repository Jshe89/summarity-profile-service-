import { GraphqlOutputError } from '@shared/errors/graphql-output.error';
export declare enum USER_ERRORS {
    USER_ALREADY_EXISTS = "User with this email already exists",
    USER_NOT_FOUND = "User not found",
    USER_NOT_UPDATED = "User with this id was not updated"
}
export type USER_ERRORS_TYPE = keyof typeof USER_ERRORS;
export declare class UserError extends GraphqlOutputError<USER_ERRORS, USER_ERRORS_TYPE> {
    constructor(message: USER_ERRORS, type: USER_ERRORS_TYPE, data: Record<string, any>);
}
export declare class UserAlreadyExistsError extends UserError {
    constructor(data: Record<string, any>);
}
export declare class UserNotFoundError extends UserError {
    constructor(data: Record<string, any>);
}
export declare class UserNotUpdatedError extends UserError {
    constructor(data: Record<string, any>);
}
