import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './EnvironmentVariables';

export type AppConfigService = ConfigService<EnvironmentVariables>;
