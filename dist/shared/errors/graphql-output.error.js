"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformErrorToGraphqlErrorOutput = exports.GraphqlOutputErrorList = exports.GraphqlOutputError = void 0;
const error_helper_1 = require("../helpers/error.helper");
const validate_schema_helper_1 = require("../helpers/validate-schema.helper");
const base_error_1 = require("./base.error");
class GraphqlOutputError extends base_error_1.BaseError {
    constructor(message, type, data, originError) {
        super(message, type, data, originError);
        this.graphqlError = true;
        Object.defineProperty(this, 'name', {
            value: 'GraphqlOutputError',
            configurable: true
        });
        this.setCallerName(__filename);
    }
}
exports.GraphqlOutputError = GraphqlOutputError;
class GraphqlOutputErrorList {
    constructor(errors) {
        this.graphqlErrorList = true;
        this.errors = errors;
    }
}
exports.GraphqlOutputErrorList = GraphqlOutputErrorList;
const transformErrorToGraphqlErrorOutput = (error) => {
    if ((0, validate_schema_helper_1.isSchemaValidationErrors)(error)) {
        return new GraphqlOutputErrorList((0, validate_schema_helper_1.extractValidationErrors)(error));
    }
    return new GraphqlOutputErrorList([
        error instanceof GraphqlOutputError
            ? error
            : new GraphqlOutputError((0, error_helper_1.getErrorMessage)(error), error.type || error.code || error.extensions?.code || error.name || typeof error, {}, error)
    ]);
};
exports.transformErrorToGraphqlErrorOutput = transformErrorToGraphqlErrorOutput;
//# sourceMappingURL=graphql-output.error.js.map