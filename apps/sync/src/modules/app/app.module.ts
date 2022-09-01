import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configValidator } from '@flip/config';

import { EnvironmentVariables } from '../../types';
import { AppModules } from '..';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate: configValidator(EnvironmentVariables),
    }),
    ...AppModules,
  ],
})
export class AppModule {}
