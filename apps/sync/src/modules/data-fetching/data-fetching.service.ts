import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

import { DBClient } from '@flip/db-client';

import { Data, ProfitableRecord, RequestsParams } from './interfaces';
import { OftenBoughtRecord } from './interfaces/often-bought.interface';

@Injectable()
export class DataFetchingService implements OnModuleInit {
  private readonly MAX_REQUEST_SIZE = 1000;
  private readonly logger = new Logger(DataFetchingService.name);

  constructor(
    private readonly dbClient: DBClient,
    private readonly httpService: HttpService
  ) {}

  onModuleInit(): void {
    this.clearData().then(() => this.fetchData());
  }

  /**
   * Removes all data from the database.
   * @return {Promise<void>}
   * @memberof DataFetchingService
   */
  async clearData(): Promise<void> {
    this.logger.log('Clearing data...');
    await Promise.all([
      this.dbClient.oftenBought.deleteMany({}),
      this.dbClient.profitable.deleteMany({}),
    ]);
    this.logger.log('Data cleared');
  }

  /**
   * Fetches data from the API and stores it in the database.
   * @return {Promise<void>}
   * @memberof DataFetchingService
   */
  async fetchData(size = 21000): Promise<void> {
    this.logger.log('Start fetching data...');
    const requestsParams = this.chunkRequests(size);

    const responses = await Promise.all(
      requestsParams.map(async (params) => {
        this.logger.debug(
          `Fetching data with params: ${JSON.stringify(params)}`
        );
        const request = this.httpService.get<Data>('/orders', {
          params,
        });
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const response = await firstValueFrom(request);
        return this.fromAxiosResponse(response);
      })
    );

    const data = this.mergeResponses(responses);

    const oftenBoughtDto = this.toOftenBoughtDto(data);
    const profitableDto = this.toProfitableDto(data);

    this.logger.debug('Saving data...');
    await Promise.all([
      this.dbClient.oftenBought.createMany({ data: oftenBoughtDto }),
      this.dbClient.profitable.createMany({ data: profitableDto }),
    ]);
    this.logger.log('Data saved');
  }

  /**
   * Extracts data from the Axios response.
   * @param {AxiosResponse<Data>} response Axios response.
   * @return {Data} Data from the response.
   * @memberof DataFetchingService
   */
  private fromAxiosResponse(response: AxiosResponse<Data>): Data {
    return response.data;
  }

  /**
   * Chunks requests into smaller based on the `MAX_REQUEST_SIZE` constant.
   * @param {number} size Number of items to fetch.
   * @return {RequestsParams[]} Array of requests params.
   * @memberof DataFetchingService
   */
  private chunkRequests(size: number): RequestsParams[] {
    let itemsToFetch = size;
    const params = [] as RequestsParams[];

    let page = 0;
    while (itemsToFetch > 0) {
      const limit = Math.min(itemsToFetch, this.MAX_REQUEST_SIZE);
      params.push({ _page: page++, _limit: limit });
      itemsToFetch -= limit;
    }

    return params;
  }

  /**
   * Merge responses data into one array.
   * @param {Data[]} data Array of responses data.
   * @return {Data} Merged data.
   * @memberof DataFetchingService
   */
  private mergeResponses(data: Data[]): Data {
    return data.flat();
  }

  /**
   * Merges duplicates items based on the `id` property and sum of the `property`.
   * @param {T[]} data Array of items.
   * @param {string} property Property to sum.
   * @return {T[]} Merged data.
   * @memberof DataFetchingService
   */
  private mergeDuplicatesByProperty<T extends { id: string }>(
    data: T[],
    property: string
  ): T[] {
    return data.reduce((acc, item) => {
      const existingIndex = acc.findIndex((i) => i.id === item.id);
      if (existingIndex >= 0) {
        acc[existingIndex][property] += item[property];
      } else {
        acc.push(item);
      }
      return acc;
    }, [] as T[]);
  }

  /**
   * Maps data to the `OftenBoughtRecord` DTO.
   * @param {Data} data Data to map.
   * @return {OftenBoughtRecord[]} Merged data.
   * @memberof DataFetchingService
   */
  private toOftenBoughtDto(data: Data): OftenBoughtRecord[] {
    const dtos = data.flatMap(({ date, items }) => {
      const purchaseDay = new Date(date).toISOString().split('T')[0];
      return items.map((item) => {
        const dto: OftenBoughtRecord = {
          id: `${item.product.id}-${purchaseDay}`,
          product_id: item.product.id,
          ordered: item.quantity,
          date: new Date(date),
        };
        return dto;
      });
    });
    return this.mergeDuplicatesByProperty(dtos, 'ordered');
  }

  /**
   * Maps data to the `ProfitableRecord` DTO.
   * @param {Data} data Data to map.
   * @return {ProfitableRecord[]} Merged data.
   * @memberof DataFetchingService
   */
  private toProfitableDto(data: Data): ProfitableRecord[] {
    const dtos = data.flatMap(({ items }) => {
      return items.map((item) => {
        const dto: ProfitableRecord = {
          id: `${item.product.id}`,
          value: item.product.price * item.quantity,
        };
        return dto;
      });
    });
    return this.mergeDuplicatesByProperty(dtos, 'value');
  }
}
