"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUnauthorizedError = exports.AuthWrongCredentialsError = exports.AuthError = exports.AUTH_ERRORS = void 0;
const graphql_output_error_1 = require("../../shared/errors/graphql-output.error");
var AUTH_ERRORS;
(function (AUTH_ERRORS) {
    AUTH_ERRORS["AUTH_WRONG_CREDENTIALS"] = "Wrong credentials";
    AUTH_ERRORS["AUTH_UNAUTHORIZED"] = "User unauthorized";
})(AUTH_ERRORS || (exports.AUTH_ERRORS = AUTH_ERRORS = {}));
class AuthError extends graphql_output_error_1.GraphqlOutputError {
    constructor(message, type, data) {
        super(message, type, data);
        Object.defineProperty(this, 'name', {
            value: 'AuthError',
            configurable: true
        });
        this.setCallerName(__filename);
    }
}
exports.AuthError = AuthError;
class AuthWrongCredentialsError extends AuthError {
    constructor() {
        super(AUTH_ERRORS.AUTH_WRONG_CREDENTIALS, 'AUTH_WRONG_CREDENTIALS');
        Object.defineProperty(this, 'name', { value: 'AuthWrongCredentialsError' });
    }
}
exports.AuthWrongCredentialsError = AuthWrongCredentialsError;
class AuthUnauthorizedError extends AuthError {
    constructor() {
        super(AUTH_ERRORS.AUTH_UNAUTHORIZED, 'AUTH_UNAUTHORIZED');
        Object.defineProperty(this, 'name', { value: 'AuthUnauthorizedError' });
    }
}
exports.AuthUnauthorizedError = AuthUnauthorizedError;
//# sourceMappingURL=auth.errors.js.map