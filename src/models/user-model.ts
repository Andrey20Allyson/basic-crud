import { User } from "@prisma/client";
import { BirthDate } from "./birth-date";
import { Name } from "./name";

export class UserModel {
  readonly name: Name;
  readonly birthDate: BirthDate;

  constructor(
    readonly id: number | null,
    name: Name | string,
    birthDate: BirthDate | Date,
    readonly passwordHash: string,
  ) {
    this.name = Name.from(name);
    this.birthDate = BirthDate.from(birthDate);
  }

  setId(id?: number | null): UserModel {
    if (id === undefined) return this;

    return new UserModel(
      id,
      this.name,
      this.birthDate,
      this.passwordHash,
    );
  }

  setName(name?: Name | string): UserModel {
    if (name === undefined) return this;

    return new UserModel(
      this.id,
      name,
      this.birthDate,
      this.passwordHash,
    );
  }

  setBirthDate(birthDate?: BirthDate | Date): UserModel {
    if (birthDate === undefined) return this;

    return new UserModel(
      this.id,
      this.name,
      birthDate,
      this.passwordHash,
    );
  }

  setPasswordHash(passwordHash?: string): UserModel {
    if (passwordHash === undefined) return this;

    return new UserModel(
      this.id,
      this.name,
      this.birthDate,
      passwordHash,
    );
  }

  static fromEntity(entity: User) {
    return new UserModel(
      entity.id,
      new Name(entity.name),
      new BirthDate(entity.birth_date),
      entity.password_hash,
    );
  }
}