"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const path = require("path");
const validate_env_helper_1 = require("../shared/helpers/validate-env.helper");
const db_tables_config_1 = require("./db-tables.config");
exports.env = (0, validate_env_helper_1.validateEnv)(__filename);
exports.default = {
    logger: {
        pretty: exports.env.LOGGER_PRETTY === 'true',
        logLevel: exports.env.LOGGER_LOG_LEVEL || 'info'
    },
    app: {
        env: exports.env.NODE_ENV,
        serverBaseUrl: exports.env.SERVER_BASE_URL.replace(/\/+\s*$/, ''),
        port: parseInt(exports.env.PORT, 10) || 3011,
        cors: {
            enabled: exports.env.CORS_ENABLED === 'true',
            options: {
                origin: exports.env.CORS_ORIGIN,
                methods: exports.env.CORS_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE',
                preflightContinue: false,
                optionsSuccessStatus: 204
            }
        },
        helmet: {
            enabled: exports.env.HELMET_ENABLED === 'true',
            options: { contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }
        },
        rateLimit: {
            enabled: exports.env.RATE_LIMIT_ENABLED === 'true',
            windowMs: parseInt(exports.env.RATE_LIMIT_WINDOW, 10) || (15 * 6 * 1000),
            max: parseInt(exports.env.RATE_LIMIT_MAX, 10) || 100
        },
        graphql: {
            introspection: exports.env.GRAPHQL_INTROSPECTION === 'true',
            tracing: exports.env.GRAPHQL_TRACING === 'true',
            debug: exports.env.GRAPHQL_DEBUG === 'true',
            playground: exports.env.GRAPHQL_PLAYGROUND === 'true' ? { version: '1.7.26' } : false,
            path: exports.env.GRAPHQL_PATH,
        },
        jwtAuth: {
            secret: exports.env.JWT_AUTH_SECRET,
        },
        voyager: {
            enabled: exports.env.VOYAGER_ENABLED === 'true',
            uri: exports.env.VOYAGER_URI || '/api/voyager'
        }
    },
    database: {
        type: 'postgres',
        host: exports.env.DB_HOST,
        port: parseInt(exports.env.DB_PORT, 10) || 5432,
        username: exports.env.DB_USER,
        password: exports.env.DB_PWD,
        database: exports.env.DB_NAME,
        entities: [path.resolve(__dirname, '../modules/**/*.entity.js')],
        synchronize: false,
        autoLoadModels: true,
        logging: true,
        timezone: exports.env.DB_TIMEZONE || '+00:00',
        migrationsTableName: db_tables_config_1.DB_TABLE_NAMES.MIGRATIONS,
    },
};
//# sourceMappingURL=configuration.js.map