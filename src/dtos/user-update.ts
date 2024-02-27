import { z } from "zod";
import { Password } from "../models/password";
import { BirthDate } from "../models/birth-date";
import { Name } from "../models/name";

export class PasswordUpdate {
  readonly old: Password;
  readonly new: Password;

  constructor(
    oldPassword: Password,
    newPassword: Password,
  ) {
    this.old = oldPassword;
    this.new = newPassword;
  }
}

export class UserUpdateDTO {
  constructor(
    readonly name?: Name,
    readonly birthDate?: BirthDate,
    readonly password?: PasswordUpdate,
  ) { }

  static readonly schema = z.object({
    name: z.string()
      .optional(),
    birthDate: z.date({ coerce: true })
      .optional(),
    password: z.object({
      old: z.string(),
      new: z.string()
    }).optional(),
  });

  static parse(data: unknown): UserUpdateDTO {
    const { birthDate, name, password } = UserUpdateDTO.schema.parse(data);

    return new UserUpdateDTO(
      name !== undefined
        ? new Name(name)
        : undefined,
      birthDate !== undefined
        ? new BirthDate(birthDate)
        : undefined,
      password !== undefined
        ? new PasswordUpdate(
          new Password(password.old),
          new Password(password.new),
        ) : undefined,
    );
  }
}

export type UserUpdateRequestDTO = z.infer<typeof UserUpdateDTO.schema>;