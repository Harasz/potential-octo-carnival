import { CacheModuleOptions } from './cache-module-options.interface';

export interface CacheModuleOptionsFactory {
  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions;
}
