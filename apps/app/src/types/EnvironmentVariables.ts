import {
  IsEnum,
  IsFQDN,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export enum NODE_ENV {
  Production = 'production',
  Development = 'development',
  Test = 'test',
}

export class EnvironmentVariables {
  @IsString()
  @IsEnum(NODE_ENV)
  NODE_ENV: NODE_ENV;

  @IsNumber()
  @IsPositive()
  NESTJS_PORT: number;

  @IsString()
  NESTJS_API_PREFIX: string;

  @IsFQDN({ require_tld: false })
  REDIS_HOST: string;

  @IsNumber()
  @IsPositive()
  REDIS_PORT: number;
}
