import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';

import { redisAppConfig } from '@flip/config';

import { CatalogModule } from './modules';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CatalogModule,
    redisAppConfig
  );

  await app.listen();
  Logger.log(`🚀 Catalog service is running.`);
}

bootstrap();
