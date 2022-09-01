import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';

import { redisAppConfig } from '@flip/config';

import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    redisAppConfig
  );

  await app.listen();
  Logger.log(`🚀 Sync service is running.`);
}

bootstrap();
