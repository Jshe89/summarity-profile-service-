"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const logger_service_1 = require("./modules/common/service/logger.service");
const app_module_1 = require("./app/app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: logger_service_1.default
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    const config = app.get((config_1.ConfigService));
    if (config.get('app.cors.enabled', { infer: true })) {
        app.enableCors(config.get('app.cors.options', { infer: true }));
    }
    app.enableShutdownHooks();
    await app.listen(config.get('app.port', { infer: true }));
}
bootstrap().catch(e => {
    logger_service_1.LoggerService.error(e);
    process.exit(1);
});
//# sourceMappingURL=main.js.map