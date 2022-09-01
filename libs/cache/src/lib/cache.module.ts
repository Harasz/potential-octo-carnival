import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './cache.module-definition';
import { CacheService } from './cache.service';

@Module({
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule extends ConfigurableModuleClass {}
