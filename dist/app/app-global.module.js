"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppGlobalModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const apollo_1 = require("@nestjs/apollo");
const config_1 = require("@nestjs/config");
const graphql_1 = require("@nestjs/graphql");
const configuration_1 = require("../config/configuration");
let AppGlobalModule = class AppGlobalModule {
};
exports.AppGlobalModule = AppGlobalModule;
exports.AppGlobalModule = AppGlobalModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [],
        controllers: [],
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
                ignoreEnvFile: false,
                load: [() => configuration_1.default]
            }),
            graphql_1.GraphQLModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                driver: apollo_1.ApolloDriver,
                useFactory: (cfg) => ({
                    tracing: cfg.get('app.graphql.tracing', { infer: true }),
                    debug: cfg.get('app.graphql.debug', { infer: true }),
                    introspection: cfg.get('app.graphql.introspection', { infer: true }),
                    playground: cfg.get('app.graphql.playground', { infer: true }),
                    autoSchemaFile: 'src/schema.gql',
                    path: cfg.get('app.graphql.path', { infer: true }),
                    engine: {
                        debugPrintReports: true
                    },
                    context: ({ req, connection }) => {
                        if (connection) {
                            return { req: { headers: connection.context } };
                        }
                        return { req };
                    },
                    uploads: false,
                    persistedQueries: false
                }),
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [
                    config_1.ConfigModule.forRoot({
                        envFilePath: [
                            '.env',
                            '.env.local',
                            '.env.development',
                            '.env.development.local',
                            '.env.test.local',
                            '.env.production.local',
                        ],
                    }),
                ],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    return Object.assign({}, configService.get('database', { infer: true }));
                }
            }),
        ],
        exports: [
            config_1.ConfigModule,
        ]
    })
], AppGlobalModule);
//# sourceMappingURL=app-global.module.js.map