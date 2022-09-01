import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DBClient } from './db-client.service';

@Module({
  imports: [ConfigModule],
  providers: [DBClient],
  exports: [DBClient],
})
export class DbClientModule {}
