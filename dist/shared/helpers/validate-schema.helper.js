"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractValidationErrors = exports.isSchemaValidationErrors = exports.validateSchema = exports.validationMessage = void 0;
const class_validator_1 = require("class-validator");
const lodash_1 = require("lodash");
const base_error_1 = require("../errors/base.error");
const graphql_output_error_1 = require("../errors/graphql-output.error");
function validationMessage(errorClass) {
    return function message(data) {
        const error = errorClass.length ? new errorClass(data.object) : new errorClass();
        return error.toStringMessage();
    };
}
exports.validationMessage = validationMessage;
async function validateSchema(schema, data) {
    await (0, class_validator_1.validateOrReject)(Object.assign(new schema(), data));
}
exports.validateSchema = validateSchema;
function isSchemaValidationErrors(errors) {
    if (!errors || !Array.isArray(errors)) {
        return false;
    }
    return errors[0] instanceof class_validator_1.ValidationError;
}
exports.isSchemaValidationErrors = isSchemaValidationErrors;
function extractValidationErrors(errors) {
    const extractedErrors = [];
    errors.forEach(error => {
        extractedErrors.push(...Object.values(error.constraints).map(message => {
            if (base_error_1.BaseError.isBaseError(message)) {
                const parsedError = base_error_1.BaseError.parseFromString(message);
                return Object.assign(new graphql_output_error_1.GraphqlOutputError(parsedError.message, parsedError.type, parsedError.data, parsedError.originError), base_error_1.BaseError.parseFromString(message));
            }
            return new graphql_output_error_1.GraphqlOutputError(message, lodash_1.default.snakeCase(error.target?.constructor?.name || 'validationError').toUpperCase(), error.target);
        }));
    });
    return extractedErrors;
}
exports.extractValidationErrors = extractValidationErrors;
//# sourceMappingURL=validate-schema.helper.js.map