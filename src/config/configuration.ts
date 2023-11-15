import * as path from 'path';
import { validateEnv } from '@shared/helpers/validate-env.helper';
import { IConfig } from './configuration.types';
import { DB_TABLE_NAMES } from './db-tables.config';

export const env = validateEnv(__filename);

export default {
  logger: {
    pretty: env.LOGGER_PRETTY === 'true',
    logLevel: env.LOGGER_LOG_LEVEL || 'info'
  },
  app: {
    env: env.NODE_ENV,
    serverBaseUrl: env.SERVER_BASE_URL.replace(/\/+\s*$/, ''),
    port: parseInt(env.PORT, 10) || 3011,
    cors: {
      enabled: env.CORS_ENABLED === 'true',
      options: {
        origin: env.CORS_ORIGIN,
        methods: env.CORS_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204
      }
    },
    helmet: {
      enabled: env.HELMET_ENABLED === 'true',
      options: { contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }
    },
    rateLimit: {
      enabled: env.RATE_LIMIT_ENABLED === 'true',
      windowMs: parseInt(env.RATE_LIMIT_WINDOW, 10) || (15 * 6 * 1000),
      max: parseInt(env.RATE_LIMIT_MAX, 10) || 100
    },
    graphql: {
      introspection: env.GRAPHQL_INTROSPECTION === 'true',
      tracing: env.GRAPHQL_TRACING === 'true',
      debug: env.GRAPHQL_DEBUG === 'true',
      playground: env.GRAPHQL_PLAYGROUND === 'true' ? { version: '1.7.26' } : false,
      path: env.GRAPHQL_PATH,
    },
    jwtAuth: {
      secret: env.JWT_AUTH_SECRET,
    },
    voyager: {
      enabled: env.VOYAGER_ENABLED === 'true',
      uri: env.VOYAGER_URI || '/api/voyager'
    }
  },
  database: {
    type: 'postgres',
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT, 10) || 5432,
    username: env.DB_USER,
    password: env.DB_PWD,
    database: env.DB_NAME,
    entities: [path.resolve(__dirname, '../modules/**/*.entity.js')],
    synchronize: false,
    autoLoadModels: true,
    logging: true,
    timezone: env.DB_TIMEZONE || '+00:00',
    migrationsTableName: DB_TABLE_NAMES.MIGRATIONS,
  },
} as IConfig;
