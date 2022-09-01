import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CacheModuleConfig, configValidator } from '@flip/config';
import { ClientModule } from '@flip/client';
import { CacheModule } from '@flip/cache';

import { AppController } from './app.controller';
import { EnvironmentVariables } from '../../types/EnvironmentVariables';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate: configValidator(EnvironmentVariables),
    }),
    CacheModule.registerAsync({
      useClass: CacheModuleConfig,
    }),
    ClientModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
