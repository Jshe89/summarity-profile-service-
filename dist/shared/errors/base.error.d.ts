export declare class BaseError<T extends string = string, V = string> {
    static isBaseError(error: string): any;
    static parseFromString(error: string): BaseError<string, string>;
    message: T;
    type: V;
    id: string;
    data?: Record<string, any>;
    originError?: Record<string, any>;
    callerName?: string;
    constructor(message: T, type: V, data?: Record<string, any>, originError?: Record<string, any>);
    setCallerName(filename: string): void;
    toStringMessage(): string;
}
