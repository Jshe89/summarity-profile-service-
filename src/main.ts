import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { IConfig } from '@config/configuration.types';
import logger, { LoggerService } from '@modules/common/service/logger.service';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger
  });
  app.useGlobalPipes(new ValidationPipe());
  const config = app.get(ConfigService<IConfig>);

  if (config.get('app.cors.enabled', { infer: true })) {
    app.enableCors(config.get('app.cors.options', { infer: true }));
  }
  app.enableShutdownHooks();
  await app.listen(config.get('app.port', { infer: true }));
}

bootstrap().catch(e => {
  LoggerService.error(e);
  process.exit(1);
});

