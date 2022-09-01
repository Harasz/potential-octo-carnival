export abstract class Command<T> {
  static readonly message: string;

  constructor(public readonly data: T) {}

  public abstract getMessage(): string;

  public getData(): T {
    return this.data;
  }
}
