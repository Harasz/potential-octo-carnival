import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { DbClientModule } from '@flip/db-client';

import { DataFetchingService } from './data-fetching.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://recruitment-api.dev.flipfit.io/',
    }),
    DbClientModule,
  ],
  providers: [DataFetchingService],
})
export class DataFetchingModule {}
