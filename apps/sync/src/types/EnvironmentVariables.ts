import { IsFQDN, IsNumber, IsPositive } from 'class-validator';

export class EnvironmentVariables {
  @IsFQDN({ require_tld: false })
  REDIS_HOST: string;

  @IsNumber()
  @IsPositive()
  REDIS_PORT: number;
}
