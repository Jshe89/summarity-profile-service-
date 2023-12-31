"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const logger_service_1 = require("../../modules/common/service/logger.service");
const graphql_output_error_1 = require("../errors/graphql-output.error");
let ErrorInterceptor = class ErrorInterceptor {
    intercept(context, next) {
        return next
            .handle()
            .pipe((0, operators_1.catchError)((e) => {
            if (!(e instanceof graphql_output_error_1.GraphqlOutputErrorList)) {
                e = (0, graphql_output_error_1.transformErrorToGraphqlErrorOutput)(e);
            }
            e.errors.forEach(error => logger_service_1.default.error(error));
            return (0, rxjs_1.of)(e);
        }));
    }
};
exports.ErrorInterceptor = ErrorInterceptor;
exports.ErrorInterceptor = ErrorInterceptor = __decorate([
    (0, common_1.Injectable)()
], ErrorInterceptor);
//# sourceMappingURL=error.interceptor.js.map