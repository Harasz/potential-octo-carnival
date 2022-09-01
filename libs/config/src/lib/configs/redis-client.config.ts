import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProvider,
  ClientsModuleOptionsFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class RedisClientConfig implements ClientsModuleOptionsFactory {
  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService
  ) {}

  async createClientOptions(): Promise<ClientProvider> {
    return {
      transport: Transport.REDIS,
      options: {
        host: this.configService.getOrThrow('REDIS_HOST'),
        port: this.configService.getOrThrow('REDIS_PORT'),
        db: 1,
      },
    };
  }
}
