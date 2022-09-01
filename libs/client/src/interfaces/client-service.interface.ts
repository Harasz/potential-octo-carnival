import { SendMethod } from './send.interface';

export interface ClientServiceInterface {
  execute: SendMethod;
}
