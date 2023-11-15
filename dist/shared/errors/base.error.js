"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
const crypto_1 = require("crypto");
const _ = require("lodash");
const error_helper_1 = require("../helpers/error.helper");
const ERROR_STRING_PREFIX = 'BASE_ERROR:';
class BaseError {
    static isBaseError(error) {
        return _.startsWith(error, ERROR_STRING_PREFIX);
    }
    static parseFromString(error) {
        return JSON.parse(error.replace(ERROR_STRING_PREFIX, ''));
    }
    constructor(message, type, data, originError) {
        this.id = (0, crypto_1.randomUUID)();
        this.message = message;
        this.type = type;
        this.data = data;
        const error = originError ? originError : new Error(message);
        this.originError = {
            message: error.message,
            stack: error.stack,
        };
    }
    setCallerName(filename) {
        this.callerName = (0, error_helper_1.getCallerFileName)(filename);
    }
    toStringMessage() {
        return `${ERROR_STRING_PREFIX}${JSON.stringify(this)}`;
    }
}
exports.BaseError = BaseError;
//# sourceMappingURL=base.error.js.map