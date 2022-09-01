import { Command } from '../interfaces';

export interface OftenBoughtCommandData {
  yesterday?: boolean;
}

export type OftenBoughtCommandResult = string[];

export class OftenBoughtCommand extends Command<OftenBoughtCommandData> {
  static readonly message = 'catalog.top10.often.bought';
  constructor(public readonly data: OftenBoughtCommandData) {
    super(data);
  }

  getMessage(): string {
    return OftenBoughtCommand.message;
  }
}

export type OftenBoughtSendMethod = (
  command: OftenBoughtCommand
) => Promise<OftenBoughtCommandResult>;
