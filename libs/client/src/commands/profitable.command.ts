import { Command } from '../interfaces';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProfitableCommandData {}

export type ProfitableCommandResult = string[];

export class ProfitableCommand extends Command<ProfitableCommandData> {
  static readonly message = 'catalog.top10.profitable';
  constructor(public readonly data: ProfitableCommandData) {
    super(data);
  }

  getMessage(): string {
    return ProfitableCommand.message;
  }
}

export type ProfitableSendMethod = (
  command: ProfitableCommand
) => Promise<ProfitableCommandResult>;
