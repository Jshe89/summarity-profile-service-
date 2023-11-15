import { GraphqlOutputError } from '@shared/errors/graphql-output.error';
export declare enum AUTH_ERRORS {
    AUTH_WRONG_CREDENTIALS = "Wrong credentials",
    AUTH_UNAUTHORIZED = "User unauthorized"
}
export type AUTH_ERRORS_TYPE = keyof typeof AUTH_ERRORS;
export declare class AuthError extends GraphqlOutputError<AUTH_ERRORS, AUTH_ERRORS_TYPE> {
    constructor(message: AUTH_ERRORS, type: AUTH_ERRORS_TYPE, data?: Record<string, any>);
}
export declare class AuthWrongCredentialsError extends AuthError {
    constructor();
}
export declare class AuthUnauthorizedError extends AuthError {
    constructor();
}
