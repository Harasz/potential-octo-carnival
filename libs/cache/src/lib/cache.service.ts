import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

import { MODULE_OPTIONS_TOKEN } from './cache.module-definition';
import { CacheModuleOptions } from './interfaces';

@Injectable()
export class CacheService implements OnModuleInit {
  private readonly redisClient: Redis;

  constructor(@Inject(MODULE_OPTIONS_TOKEN) options: CacheModuleOptions) {
    this.redisClient = new Redis({
      host: options.host,
      port: options.port,
      db: options.db,
      lazyConnect: true,
    });
  }

  async onModuleInit() {
    await this.redisClient.connect();
  }

  /**
   * Get cached data from redis cache under given key
   * @param key - key to save data under
   * @return cached data
   */
  async get<T>(key: string): Promise<T> {
    const cachedResults = await this.redisClient.get(key);
    const parsedResults = JSON.parse(cachedResults);
    return parsedResults as T;
  }

  /**
   * Save data to redis cache under given key
   * @param key - key to save data under
   * @param value - data to save
   * @param ttl - time to live in seconds
   * @return saved data
   */
  async set<T>(key: string, value: T, ttl = 5): Promise<T> {
    const serializedValue = JSON.stringify(value);
    await this.redisClient.set(key, serializedValue, 'EX', ttl);
    return value;
  }
}
