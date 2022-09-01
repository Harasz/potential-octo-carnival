import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

import { RedisClientConfig } from '@flip/config';

import { ClientService } from './client.service';
import { CLIENT_TOKEN } from './client.token';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: CLIENT_TOKEN,
        useClass: RedisClientConfig,
      },
    ]),
  ],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
