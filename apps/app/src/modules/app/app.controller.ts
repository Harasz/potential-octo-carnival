import { Controller, Get, Logger, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { endOfDay, differenceInSeconds } from 'date-fns';

import { CacheService, CacheInterceptor } from '@flip/cache';
import {
  OftenBoughtCommand,
  ProfitableCommand,
  ClientService,
} from '@flip/client';

@Controller('/top10')
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly client: ClientService,
    private readonly cacheService: CacheService
  ) {}

  @Get('/profitable')
  @ApiTags('Most profitable products')
  @ApiOkResponse({
    type: [String],
    description: 'Get top 10 most profitable products',
  })
  @UseInterceptors(CacheInterceptor)
  async getTop10ProfitableProducts() {
    this.logger.debug('Get top 10 profitable products');
    return await this.client.execute(new ProfitableCommand({}));
  }

  @Get('/often-bought')
  @ApiTags('Most often bought products')
  @ApiOkResponse({
    type: [String],
    description: 'Get top 10 most often bought products',
  })
  @UseInterceptors(CacheInterceptor)
  async getTop10MostOftenBoughtProducts() {
    this.logger.debug('Get top 10 most often bought products');
    return await this.client.execute(new OftenBoughtCommand({}));
  }

  @Get('/often-bought-yesterday')
  @ApiTags('Most often bought products')
  @ApiOkResponse({
    type: [String],
    description: 'Get top 10 most often bought products yesterday',
  })
  async getTop10MostOftenBoughtProductsYesterday() {
    this.logger.debug('Get top 10 most often bought products yesterday');
    const cacheKey = 'often-bought-yesterday';

    const cachedResult = await this.cacheService.get(cacheKey);

    if (cachedResult) {
      this.logger.debug('Cache hit');
      return cachedResult;
    }

    this.logger.debug('Cache miss');
    const result = await this.client.execute(
      new OftenBoughtCommand({
        yesterday: true,
      })
    );
    const endOfDayDate = endOfDay(new Date());

    this.logger.debug('Cache result');
    await this.cacheService.set(
      cacheKey,
      result,
      differenceInSeconds(endOfDayDate, new Date())
    );

    return result;
  }
}
