"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
exports.AuthUser = (0, common_1.createParamDecorator)((data, ctx) => {
    return graphql_1.GqlExecutionContext.create(ctx).getContext().req.user;
});
//# sourceMappingURL=auth-user.decorator.js.map