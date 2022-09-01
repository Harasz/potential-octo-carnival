import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './modules';
import { AppConfigService } from './types';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<AppConfigService>(ConfigService);

  const apiPrefix = configService.get('NESTJS_API_PREFIX');
  const apiPort = configService.get('NESTJS_PORT');

  app.setGlobalPrefix(apiPrefix);

  const config = new DocumentBuilder()
    .setTitle('TOP10 API')
    .setDescription('Get top 10 most profitable and often bought products.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(apiPrefix, app, document);

  await app.listen(apiPort);
  Logger.log(
    `🚀 Application is running on: http://localhost:${apiPort}/${apiPrefix}`
  );
}

bootstrap();
