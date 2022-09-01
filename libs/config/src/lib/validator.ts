import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

export { validationPipeConfig } from './configs/validation-pipe.config';

export function configValidator<T extends object>(ConfigClass: { new (): T }) {
  return function validator(config: Record<string, unknown>) {
    const validatedConfig = plainToClass(ConfigClass, config, {
      enableImplicitConversion: true,
    });

    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }
    return validatedConfig;
  };
}
