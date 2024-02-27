import { WebApplicationError } from "../errors/web-app-error";

export class Password {
  constructor(readonly value: string) {
    if (value.length < 6) throw new WebApplicationError(`A senha deve ter pelo menos 6 caracteres`, 422);
  }

  static from(value: string | Password) {
    if (value instanceof Password) return value;

    return new Password(value);
  }
}