"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnv = void 0;
const fs = require("fs");
const dotenv_1 = require("dotenv");
const _ = require("lodash");
const common_1 = require("@nestjs/common");
const app_helper_1 = require("./app.helper");
function validateEnv(filename) {
    const logContext = (0, app_helper_1.buildLogContext)(filename);
    const env = process.env;
    if (!env.NODE_ENV) {
        throw new Error('No NODE_ENV was specified in environment');
    }
    common_1.Logger.log(`Environment: ${env.NODE_ENV}`, logContext);
    const envFilePath = `.env.${env.NODE_ENV}`;
    if (fs.existsSync(envFilePath)) {
        common_1.Logger.log(`Found .env file "${envFilePath}". Loading keys...`, logContext);
        const data = (0, dotenv_1.parse)(fs.readFileSync(envFilePath));
        Object.keys(data).forEach(k => {
            if (env[k] === undefined) {
                env[k] = data[k];
            }
        });
    }
    const requiredKeys = Object.keys((0, dotenv_1.parse)(fs.readFileSync('.env.example')));
    const missedKeys = _.difference(requiredKeys, Object.keys(env));
    if (missedKeys.length > 0) {
        throw new Error(`The following ENV keys must be specified: ${missedKeys}`);
    }
    return env;
}
exports.validateEnv = validateEnv;
//# sourceMappingURL=validate-env.helper.js.map