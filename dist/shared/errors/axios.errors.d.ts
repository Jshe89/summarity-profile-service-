import { HttpException } from '@nestjs/common';
export declare class AxiosGatewayError extends HttpException {
    constructor(message: string);
}
export declare class AxiosUnprocessableError extends HttpException {
    constructor(message: string);
}
export declare class AxiosRequestTimeoutError extends HttpException {
    constructor(message: string);
}
export declare function handleAxiosError(error: any): void;
