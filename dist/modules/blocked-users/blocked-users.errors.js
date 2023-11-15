"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyBlockedError = exports.UserNotUnBlockedError = exports.UserNotBlockedError = exports.SelfBlockError = exports.BlockedUsersError = exports.BLOCKED_USERS_ERRORS = void 0;
const graphql_output_error_1 = require("../../shared/errors/graphql-output.error");
var BLOCKED_USERS_ERRORS;
(function (BLOCKED_USERS_ERRORS) {
    BLOCKED_USERS_ERRORS["SELF_BLOCK"] = "User can't block himself";
    BLOCKED_USERS_ERRORS["USER_NOT_BLOCKED"] = "User with this id was not blocked";
    BLOCKED_USERS_ERRORS["USER_NOT_UNBLOCKED"] = "User with this id was not unblocked";
    BLOCKED_USERS_ERRORS["USER_HAS_ALREADY_BLOCKED"] = "User with this id has already blocked";
})(BLOCKED_USERS_ERRORS || (exports.BLOCKED_USERS_ERRORS = BLOCKED_USERS_ERRORS = {}));
class BlockedUsersError extends graphql_output_error_1.GraphqlOutputError {
    constructor(message, type, data) {
        super(message, type, data);
        Object.defineProperty(this, 'name', {
            value: 'BlockedUsersError',
            configurable: true
        });
        this.setCallerName(__filename);
    }
}
exports.BlockedUsersError = BlockedUsersError;
class SelfBlockError extends BlockedUsersError {
    constructor(data) {
        super(BLOCKED_USERS_ERRORS.SELF_BLOCK, 'SELF_BLOCK', data);
        Object.defineProperty(this, 'name', { value: 'SelfBlockError' });
    }
}
exports.SelfBlockError = SelfBlockError;
class UserNotBlockedError extends BlockedUsersError {
    constructor(data) {
        super(BLOCKED_USERS_ERRORS.USER_NOT_BLOCKED, 'USER_NOT_BLOCKED', data);
        Object.defineProperty(this, 'name', { value: 'UserNotBlockedError' });
    }
}
exports.UserNotBlockedError = UserNotBlockedError;
class UserNotUnBlockedError extends BlockedUsersError {
    constructor(data) {
        super(BLOCKED_USERS_ERRORS.USER_NOT_UNBLOCKED, 'USER_NOT_UNBLOCKED', data);
        Object.defineProperty(this, 'name', { value: 'UserNotUnBlockedError' });
    }
}
exports.UserNotUnBlockedError = UserNotUnBlockedError;
class UserAlreadyBlockedError extends BlockedUsersError {
    constructor(data) {
        super(BLOCKED_USERS_ERRORS.USER_HAS_ALREADY_BLOCKED, 'USER_HAS_ALREADY_BLOCKED', data);
        Object.defineProperty(this, 'name', { value: 'UserAlreadyBlockedError' });
    }
}
exports.UserAlreadyBlockedError = UserAlreadyBlockedError;
//# sourceMappingURL=blocked-users.errors.js.map