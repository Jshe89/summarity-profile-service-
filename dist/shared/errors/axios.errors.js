"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAxiosError = exports.AxiosRequestTimeoutError = exports.AxiosUnprocessableError = exports.AxiosGatewayError = void 0;
const common_1 = require("@nestjs/common");
class AxiosGatewayError extends common_1.HttpException {
    constructor(message) {
        super(message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        Object.defineProperty(this, 'name', { value: 'AxiosGatewayError' });
    }
}
exports.AxiosGatewayError = AxiosGatewayError;
class AxiosUnprocessableError extends common_1.HttpException {
    constructor(message) {
        super(message, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        Object.defineProperty(this, 'name', { value: 'AxiosUnprocessableError' });
    }
}
exports.AxiosUnprocessableError = AxiosUnprocessableError;
class AxiosRequestTimeoutError extends common_1.HttpException {
    constructor(message) {
        super(message, common_1.HttpStatus.REQUEST_TIMEOUT);
        Object.defineProperty(this, 'name', { value: 'AxiosRequestTimeoutError' });
    }
}
exports.AxiosRequestTimeoutError = AxiosRequestTimeoutError;
function handleAxiosError(error) {
    if (error?.response?.status === common_1.HttpStatus.INTERNAL_SERVER_ERROR && error.response.data?.ExceptionMessage) {
        throw new AxiosGatewayError(error.response.data?.ExceptionMessage);
    }
    if ((error.response && error.response.status === common_1.HttpStatus.REQUEST_TIMEOUT) ||
        (error.code && error.code === 'ECONNABORTED')) {
        throw new AxiosRequestTimeoutError(error.config.data);
    }
    throw new AxiosGatewayError(error.response?.data ||
        error.response ||
        error.config?.data ||
        error);
}
exports.handleAxiosError = handleAxiosError;
//# sourceMappingURL=axios.errors.js.map