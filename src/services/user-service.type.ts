import { UserCreateDTO } from "../dtos/user-create";
import { UserDeleteResponseDTO } from "../dtos/user-delete";
import { UserResponseDTO } from "../dtos/user-response";
import { UserUpdateDTO } from "../dtos/user-update";

export interface IUserService {
  get(id: number): Promise<UserResponseDTO>;
  list(page?: number): Promise<UserResponseDTO[]>;
  create(data: UserCreateDTO): Promise<UserResponseDTO>;
  update(id: number, data: UserUpdateDTO): Promise<UserResponseDTO>;
  delete(id: number): Promise<UserDeleteResponseDTO>;
}

export const UserServiceType = Symbol.for('UserService');