import { WebApplicationError } from "../errors/web-app-error";

export class BirthDate {
  constructor(readonly value: Date) {
    if (this.value.getTime() > Date.now()) throw new WebApplicationError(`Data de nascimento inválido, data de nascimento no futuro`, 400);
  }

  static from(value: BirthDate | Date): BirthDate {
    if (value instanceof BirthDate) return value;

    return new BirthDate(value);
  }
}