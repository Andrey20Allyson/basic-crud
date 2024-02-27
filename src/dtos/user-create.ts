import { z } from "zod";
import { Password } from "../models/password";
import { BirthDate } from "../models/birth-date";
import { Name } from "../models/name";

export class UserCreateDTO {
  readonly name: Name;
  readonly password: Password;
  readonly birthDate: BirthDate;

  constructor(
    name: Name | string,
    birthDate: BirthDate | Date,
    password: Password | string,
  ) {
    this.name = Name.from(name);
    this.password = Password.from(password);
    this.birthDate = BirthDate.from(birthDate);
  }
  
  static readonly schema = z.object({
    name: z.string(),
    birthDate: z.date({ coerce: true }),
    password: z.string(),
  });

  static parse(data: unknown): UserCreateDTO {
    const { birthDate, name, password } = UserCreateDTO.schema.parse(data);

    return new UserCreateDTO(
      name,
      birthDate,
      password,
    );
  }
}

export type UserCreateRequestDTO = z.infer<typeof UserCreateDTO.schema>;