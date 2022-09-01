import { Module } from '@nestjs/common';

import { DbClientModule } from '@flip/db-client';

import { ProfitableService } from './profitable.service';

@Module({
  imports: [DbClientModule],
  providers: [ProfitableService],
  exports: [ProfitableService],
})
export class ProfitableModule {}
