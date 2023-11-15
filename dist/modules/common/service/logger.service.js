"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const winston_1 = require("winston");
const configuration_1 = require("../../../config/configuration");
function createWinstonLogger(label, tags) {
    return (0, winston_1.createLogger)({
        level: configuration_1.default.logger.logLevel,
        format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.combine(...label
            ? [
                typeof label === 'function'
                    ? {
                        transform: (info) => {
                            info.label = label();
                            return info;
                        }
                    }
                    : winston_1.format.label({ label })
            ]
            : [], ...tags
            ? [{
                    transform: (info) => {
                        info.tags = tags;
                        return info;
                    }
                }]
            : [], winston_1.format.metadata(), winston_1.format.errors({ stack: true }), ...!configuration_1.default.logger.pretty
            ? [
                winston_1.format.colorize(),
                winston_1.format.printf((info) => {
                    const l = info.metadata.label;
                    let m = info.message;
                    if (m instanceof Error)
                        m = m;
                    else if (typeof m === 'object')
                        m = JSON.stringify(m);
                    return `${info.metadata.timestamp} ${info.level} ${l ? `[${l}]` : ''} - ${m} ${info.stack ? `\r\n${info.stack}` : ''}`;
                })
            ]
            : [
                winston_1.format.printf((info) => {
                    const { label: l, timestamp: t } = info.metadata;
                    return `[${info.level.toUpperCase()}] [${t}] ${l ? `[${l}]` : ''} ${JSON.stringify(info)}`;
                })
            ])),
        transports: [new winston_1.transports.Console()]
    });
}
class LoggerService {
    constructor(context) {
        this.context = context;
        this.setContext(context);
        this.wlogger = createWinstonLogger(() => this.context);
    }
    error(error, trace, context, _) {
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
    log(message, context, _) {
        const pcontext = this.context;
        context ||= typeof message === 'object' && message.callerName || pcontext;
        this.setContext(context);
        this.wlogger.info(message);
        this.setContext(pcontext);
    }
    warn(message, context, _) {
        const pcontext = this.context;
        context ||= pcontext;
        this.setContext(context);
        this.wlogger.warn(message);
        this.setContext(pcontext);
    }
    debug(message, context, _) {
        const pcontext = this.context;
        context ||= pcontext;
        this.context = context;
        this.wlogger.debug(message);
        this.setContext(pcontext);
    }
    verbose(message, context, _) {
        const pcontext = this.context;
        context ||= pcontext;
        this.setContext(context);
        this.wlogger.verbose(message);
        this.setContext(pcontext);
    }
    setContext(context) {
        this.context = context;
    }
    static error(message, trace, context, _) {
        logger.error(message, trace, context);
    }
    static log(message, context, _) {
        logger.log(message, context);
    }
    static warn(message, context, _) {
        logger.warn(message, context);
    }
    static debug(message, context, _) {
        logger.debug(message, context);
    }
    static verbose(message, context, _) {
        logger.verbose(message, context);
    }
}
exports.LoggerService = LoggerService;
const logger = new LoggerService();
exports.default = logger;
//# sourceMappingURL=logger.service.js.map