export class Name {
  constructor(readonly value: string) { }

  static from(value: Name | string): Name {
    if (value instanceof Name) return value;

    return new Name(value);
  }
}