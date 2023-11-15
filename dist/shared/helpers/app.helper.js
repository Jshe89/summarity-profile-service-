"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.finalizeApp = exports.setExitHandlers = exports.wait = exports.buildLogContext = exports.parseCommaSeparatedStrings = exports.parseProcessArgs = void 0;
const path = require("path");
const timers_1 = require("timers");
const _ = require("lodash");
const common_1 = require("@nestjs/common");
const logContext = buildLogContext(__filename);
function parseProcessArgs(validNames) {
    const args = process.argv.slice(2);
    const result = args.reduce((r, arg) => {
        const [argName, argValue] = arg.split('=');
        if (argName && argValue !== undefined) {
            if (validNames && validNames.indexOf(argName) === -1) {
                throw new Error(`Unsupported parameter "${argName}"!`);
            }
            r[argName] = argValue;
        }
        return r;
    }, {});
    if (validNames) {
        const diff = _.difference(validNames, Object.keys(result));
        if (diff.length > 0) {
            throw new Error(`No required arguments were found: [ ${diff.join(', ')} ]`);
        }
    }
    return result;
}
exports.parseProcessArgs = parseProcessArgs;
function parseCommaSeparatedStrings(str) {
    return (str || '').split(',').map(s => s.trim()).filter(s => !!s);
}
exports.parseCommaSeparatedStrings = parseCommaSeparatedStrings;
function buildLogContext(fileName) {
    return path.basename(fileName).replace(/\.(t|j)s$/, '');
}
exports.buildLogContext = buildLogContext;
async function wait(ms) {
    common_1.Logger.log(`Waiting for ${ms} msec to allow complete all background operations like ES syncing etc. ...`, logContext);
    return new Promise(resolve => (0, timers_1.setTimeout)(resolve, ms));
}
exports.wait = wait;
function setExitHandlers(failForcedTimeout) {
    process.once('unhandledRejection', err => {
        common_1.Logger.error(err.stack, undefined, logContext);
        process.exit(1);
    });
    if (failForcedTimeout) {
        (0, timers_1.setTimeout)(() => {
            throw new Error(`Force the unfinished script terminating after the timeout of ${failForcedTimeout}ms!`);
        }, failForcedTimeout).unref();
    }
}
exports.setExitHandlers = setExitHandlers;
async function finalizeApp(app, waitMsBeforeExit) {
    if (waitMsBeforeExit)
        await wait(waitMsBeforeExit);
    common_1.Logger.log('Done');
    await app.close();
}
exports.finalizeApp = finalizeApp;
//# sourceMappingURL=app.helper.js.map