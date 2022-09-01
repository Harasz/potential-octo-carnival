import { ValidationPipeOptions } from '@nestjs/common';

export const validationPipeConfig: ValidationPipeOptions = {
  forbidUnknownValues: true,
  whitelist: true,
  transform: true,
  forbidNonWhitelisted: true,
};
