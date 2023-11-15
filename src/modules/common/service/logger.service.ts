/* eslint-disable @typescript-eslint/no-unused-vars */
import { TransformableInfo } from 'logform';
import { createLogger, Logger as WinstonLogger, format, transports } from 'winston';
import { LoggerService as NestLoggerService } from '@nestjs/common';
import config from '@config/configuration';

function createWinstonLogger(label?: string | { (): string }, tags?: unknown): WinstonLogger {
  return createLogger({
    level: config.logger.logLevel,
    format: format.combine(
      format.timestamp(),
      format.combine(
        ...label
          ? [
            typeof label === 'function'
              ? {
                transform: (info: TransformableInfo): TransformableInfo => {
                  info.label = label(); return info;
                }
              }
              : format.label({ label })
          ]
          : [],
        ...tags
          ? [{
            transform: (info: TransformableInfo): TransformableInfo => {
              info.tags = tags;
              return info;
            }
          }]
          : [],
        format.metadata(),
        format.errors({ stack: true }),
        ...!config.logger.pretty
          ? [
            format.colorize(),
            format.printf((info: TransformableInfo) => {
              const l = info.metadata.label;
              let m = info.message as any;
              if (m instanceof Error) m = m;
              else if (typeof m === 'object') m = JSON.stringify(m);
              return `${info.metadata.timestamp} ${info.level} ${l ? `[${l}]` : ''} - ${m} ${info.stack ? `\r\n${info.stack}` : ''}`;
            })
          ]
          : [
            format.printf((info: TransformableInfo) => {
              const { label: l, timestamp: t } = info.metadata;
              return `[${info.level.toUpperCase()}] [${t}] ${l ? `[${l}]` : ''} ${JSON.stringify(info)}`;
            })
          ]
      )
    ),
    transports: [new transports.Console()]
  });
}

export class LoggerService implements NestLoggerService {
  private wlogger: WinstonLogger;
  constructor(private context?: string) {
    this.setContext(context);
    this.wlogger = createWinstonLogger(() => this.context);
  }
  error(error: Record<string, any>, trace?: unknown, context?: string, _?: boolean): void {
    const pcontext = this.context;
    context ||= error.callerName || pcontext;
    this.setContext(context);
    this.wlogger.error({
      message: error.message,
      label: context,
      error,
    });
    this.setContext(pcontext);
  }
  log(message: Record<string, any> | string, context?: string, _?: boolean): void {
    const pcontext = this.context;
    context ||= typeof message === 'object' && message.callerName || pcontext;
    this.setContext(context);
    this.wlogger.info(message);
    this.setContext(pcontext);
  }
  warn(message: unknown, context?: string, _?: boolean): void {
    const pcontext = this.context;
    context ||= pcontext;
    this.setContext(context);
    this.wlogger.warn(message);
    this.setContext(pcontext);
  }
  debug(message: unknown, context?: string, _?: boolean): void {
    const pcontext = this.context;
    context ||= pcontext;
    this.context = context;
    this.wlogger.debug(message);
    this.setContext(pcontext);
  }
  verbose(message: unknown, context?: string, _?: boolean): void {
    const pcontext = this.context;
    context ||= pcontext;
    this.setContext(context);
    this.wlogger.verbose(message);
    this.setContext(pcontext);
  }
  setContext(context: string): void {
    this.context = context;
  }
  // getTimestamp(): string {
  //   return new Date().toISOString();
  // }
  static error(message: unknown, trace?: unknown, context?: string, _?: boolean): void {
    logger.error(message, trace, context);
  }
  static log(message: unknown, context?: string, _?: boolean): void {
    logger.log(message, context);
  }
  static warn(message: unknown, context?: string, _?: boolean): void {
    logger.warn(message, context);
  }
  static debug(message: unknown, context?: string, _?: boolean): void {
    logger.debug(message, context);
  }
  static verbose(message: unknown, context?: string, _?: boolean): void {
    logger.verbose(message, context);
  }
}

const logger = new LoggerService();
export default logger;
