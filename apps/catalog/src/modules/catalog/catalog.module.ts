import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configValidator } from '@flip/config';

import { EnvironmentVariables } from '../../types/EnvironmentVariables';
import { CatalogController } from './catalog.controller';
import { OftenBoughtModule } from '../often-bought';
import { ProfitableModule } from '../profitable';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate: configValidator(EnvironmentVariables),
    }),
    OftenBoughtModule,
    ProfitableModule,
  ],
  controllers: [CatalogController],
})
export class CatalogModule {}
