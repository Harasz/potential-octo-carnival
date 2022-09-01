import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CacheModuleOptions, CacheModuleOptionsFactory } from '@flip/cache';

@Injectable()
export class CacheModuleConfig implements CacheModuleOptionsFactory {
  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService
  ) {}

  async createCacheOptions(): Promise<CacheModuleOptions> {
    return {
      port: this.configService.getOrThrow('REDIS_PORT'),
      host: this.configService.getOrThrow('REDIS_HOST'),
      db: 2,
    };
  }
}
