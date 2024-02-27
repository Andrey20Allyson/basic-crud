import { UserModel } from "../models/user-model";

export class UserResponseDTO {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly birthDate: Date,
  ) { }

  private static _fromModel(model: UserModel): UserResponseDTO {
    if (model.id === null) throw new Error(`Invalid user DTO parsing, id is null`);
    
    return new UserResponseDTO(
      model.id,
      model.name.value,
      model.birthDate.value,
    );
  }

  static from(value: UserModel): UserResponseDTO {
    return UserResponseDTO._fromModel(value);
  }
}