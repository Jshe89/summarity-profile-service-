export interface ILoggerConfig {
    pretty: boolean;
    logLevel: string;
}
export interface IAppConfig {
    env: string;
    serverBaseUrl: string;
    port: number;
    cors: {
        enabled: boolean;
        options: {
            origin: string;
            methods: string;
            preflightContinue: boolean;
            optionsSuccessStatus: number;
        };
    };
    helmet: {
        enabled: boolean;
        options: {
            contentSecurityPolicy: boolean;
            crossOriginEmbedderPolicy: boolean;
        };
    };
    rateLimit: {
        enabled: boolean;
        windowMs: number;
        max: number;
    };
    graphql: {
        introspection: boolean;
        tracing: boolean;
        debug: boolean;
        playground: boolean;
        path: string;
    };
    jwtAuth: {
        secret: string;
    };
    voyager: {
        enabled: boolean;
        uri: string;
    };
}
export interface IDatabaseConfig {
    type: 'postgres';
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    timezone: string;
    entities: string[];
    synchronize: boolean;
    logging: boolean;
    migrationsTableName: string;
}
export type IConfig = {
    logger: ILoggerConfig;
    app: IAppConfig;
    database: IDatabaseConfig;
};
