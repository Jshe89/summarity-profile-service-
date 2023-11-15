"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMessage = exports.getCallerFileName = void 0;
const path = require("path");
const _ = require("lodash");
function getCallerFileName(filename) {
    const prepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = function (skip, s) {
        Error.prepareStackTrace = prepareStackTrace;
        return s;
    };
    const error = new Error();
    const stack = error.stack;
    const frameIndex = _.findLastIndex(stack, s => s.getFileName() === filename);
    const frame = stack[frameIndex + 1];
    const name = frame.getFileName();
    return _.startCase(path.basename(name, path.extname(name)));
}
exports.getCallerFileName = getCallerFileName;
function getErrorMessage(error) {
    const responseMessage = error.response?.message;
    if (!responseMessage) {
        return error.message || 'Server error';
    }
    if (Array.isArray(responseMessage)) {
        return responseMessage[0];
    }
    return responseMessage;
}
exports.getErrorMessage = getErrorMessage;
//# sourceMappingURL=error.helper.js.map