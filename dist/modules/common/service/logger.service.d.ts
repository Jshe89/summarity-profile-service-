import { LoggerService as NestLoggerService } from '@nestjs/common';
export declare class LoggerService implements NestLoggerService {
    private context?;
    private wlogger;
    constructor(context?: string);
    error(error: Record<string, any>, trace?: unknown, context?: string, _?: boolean): void;
    log(message: Record<string, any> | string, context?: string, _?: boolean): void;
    warn(message: unknown, context?: string, _?: boolean): void;
    debug(message: unknown, context?: string, _?: boolean): void;
    verbose(message: unknown, context?: string, _?: boolean): void;
    setContext(context: string): void;
    static error(message: unknown, trace?: unknown, context?: string, _?: boolean): void;
    static log(message: unknown, context?: string, _?: boolean): void;
    static warn(message: unknown, context?: string, _?: boolean): void;
    static debug(message: unknown, context?: string, _?: boolean): void;
    static verbose(message: unknown, context?: string, _?: boolean): void;
}
declare const logger: LoggerService;
export default logger;
