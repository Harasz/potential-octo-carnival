import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { CLIENT_TOKEN } from './client.token';
import { ClientServiceInterface, Command, SendMethod } from './interfaces';

@Injectable()
export class ClientService implements ClientServiceInterface, OnModuleInit {
  constructor(@Inject(CLIENT_TOKEN) private readonly client: ClientProxy) {}

  async onModuleInit() {
    await this.client.connect();
  }

  execute: SendMethod = async <T>(command: Command<T>) => {
    const resultObservable = this.client.send(
      command.getMessage(),
      command.getData()
    );
    return await firstValueFrom(resultObservable);
  };
}
