"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotUpdatedError = exports.UserNotFoundError = exports.UserAlreadyExistsError = exports.UserError = exports.USER_ERRORS = void 0;
const graphql_output_error_1 = require("../../shared/errors/graphql-output.error");
var USER_ERRORS;
(function (USER_ERRORS) {
    USER_ERRORS["USER_ALREADY_EXISTS"] = "User with this email already exists";
    USER_ERRORS["USER_NOT_FOUND"] = "User not found";
    USER_ERRORS["USER_NOT_UPDATED"] = "User with this id was not updated";
})(USER_ERRORS || (exports.USER_ERRORS = USER_ERRORS = {}));
class UserError extends graphql_output_error_1.GraphqlOutputError {
    constructor(message, type, data) {
        super(message, type, data);
        Object.defineProperty(this, 'name', {
            value: 'UserError',
            configurable: true
        });
        this.setCallerName(__filename);
    }
}
exports.UserError = UserError;
class UserAlreadyExistsError extends UserError {
    constructor(data) {
        super(USER_ERRORS.USER_ALREADY_EXISTS, 'USER_ALREADY_EXISTS', data);
        Object.defineProperty(this, 'name', { value: 'UserAlreadyExistsError' });
    }
}
exports.UserAlreadyExistsError = UserAlreadyExistsError;
class UserNotFoundError extends UserError {
    constructor(data) {
        super(USER_ERRORS.USER_NOT_FOUND, 'USER_NOT_FOUND', data);
        Object.defineProperty(this, 'name', { value: 'UserNotFoundError' });
    }
}
exports.UserNotFoundError = UserNotFoundError;
class UserNotUpdatedError extends UserError {
    constructor(data) {
        super(USER_ERRORS.USER_NOT_UPDATED, 'USER_NOT_UPDATED', data);
        Object.defineProperty(this, 'name', { value: 'UserNotUpdatedError' });
    }
}
exports.UserNotUpdatedError = UserNotUpdatedError;
//# sourceMappingURL=user.errors.js.map