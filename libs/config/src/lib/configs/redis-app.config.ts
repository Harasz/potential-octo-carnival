import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const redisAppConfig: MicroserviceOptions = {
  transport: Transport.REDIS,
  options: {
    host: process.env['REDIS_HOST'],
    port: Number(process.env['REDIS_PORT']),
    db: 1,
  },
};
