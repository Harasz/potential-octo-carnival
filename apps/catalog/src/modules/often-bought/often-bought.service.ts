import { Injectable, Logger } from '@nestjs/common';
import { startOfYesterday, endOfYesterday } from 'date-fns';

import { OftenBoughtCommandResult } from '@flip/client';
import { DBClient } from '@flip/db-client';

@Injectable()
export class OftenBoughtService {
  private readonly logger = new Logger(OftenBoughtService.name);

  constructor(private readonly dbClient: DBClient) {}

  /**
   * Get TOP10 often bought products.
   * @returns {Promise<OftenBoughtCommandResult>}
   */
  async getOftenBoughtProducts(): Promise<OftenBoughtCommandResult> {
    this.logger.debug('Query often bought products');
    const result = await this.dbClient.oftenBought.findMany({
      take: 10,
      select: {
        product_id: true,
      },
      orderBy: {
        ordered: 'desc',
      },
    });
    this.logger.debug('Often bought products queried, result: ', result);
    return result.flatMap((item) => item.product_id);
  }

  /**
   * Get TOP10 often bought products from yesterday.
   * @returns {Promise<OftenBoughtCommandResult>}
   */
  async getOftenBoughtProductsFromYesterday(): Promise<OftenBoughtCommandResult> {
    this.logger.debug('Query often bought products from yesterday');
    const result = await this.dbClient.oftenBought.findMany({
      take: 10,
      select: {
        product_id: true,
      },
      orderBy: {
        ordered: 'desc',
      },
      where: {
        date: {
          gte: startOfYesterday(),
          lte: endOfYesterday(),
        },
      },
    });
    this.logger.debug(
      'Often bought products from yesterday queried, result: ',
      result
    );
    return result.flatMap((item) => item.product_id);
  }
}
