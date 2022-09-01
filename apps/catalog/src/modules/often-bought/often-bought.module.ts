import { Module } from '@nestjs/common';

import { DbClientModule } from '@flip/db-client';

import { OftenBoughtService } from './often-bought.service';

@Module({
  imports: [DbClientModule],
  providers: [OftenBoughtService],
  exports: [OftenBoughtService],
})
export class OftenBoughtModule {}
