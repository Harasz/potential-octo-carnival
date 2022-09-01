import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import {
  ProfitableCommand,
  OftenBoughtCommand,
  OftenBoughtCommandData,
  ProfitableCommandResult,
  OftenBoughtCommandResult,
} from '@flip/client';

import { ProfitableService } from '../profitable';
import { OftenBoughtService } from '../often-bought';

@Controller()
export class CatalogController {
  private readonly logger = new Logger(CatalogController.name);

  constructor(
    private readonly profitableService: ProfitableService,
    private readonly oftenBoughtService: OftenBoughtService
  ) {}

  @MessagePattern(ProfitableCommand.message)
  async profitableProducts(): Promise<ProfitableCommandResult> {
    this.logger.debug('Get profitable products');
    return await this.profitableService.getProfitableProducts();
  }

  @MessagePattern(OftenBoughtCommand.message)
  async oftenBoughtProducts(
    @Payload() data: OftenBoughtCommandData
  ): Promise<OftenBoughtCommandResult> {
    this.logger.debug('Get often bought products, data: ', data);
    if (data.yesterday) {
      return await this.oftenBoughtService.getOftenBoughtProductsFromYesterday();
    }
    return await this.oftenBoughtService.getOftenBoughtProducts();
  }
}
