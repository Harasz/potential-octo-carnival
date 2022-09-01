import { Injectable, Logger } from '@nestjs/common';

import { ProfitableCommandResult } from '@flip/client';
import { DBClient } from '@flip/db-client';

@Injectable()
export class ProfitableService {
  private readonly logger = new Logger(ProfitableService.name);

  constructor(private readonly dbClient: DBClient) {}

  async getProfitableProducts(): Promise<ProfitableCommandResult> {
    this.logger.debug('Query profitable products');
    const result = await this.dbClient.profitable.findMany({
      select: {
        id: true,
      },
      take: 10,
      orderBy: {
        value: 'desc',
      },
    });
    this.logger.debug('Query profitable products, result: ', result);
    return result.flatMap((item) => item.id);
  }
}
