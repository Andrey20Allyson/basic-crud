import { interfaces } from "inversify";
import { UserModel } from "../models/user-model";

export interface ListUserOptions {
  page?: number;
  pageSize?: number;
}

export interface IUserRepository {
  save(model: UserModel): Promise<UserModel>;
  findById(id: number): Promise<UserModel | null>;
  list(options?: ListUserOptions): Promise<UserModel[]>;
  delete(id: number): Promise<boolean>;
}

export const UserRepositoryType = Symbol.for('UserRepository') as interfaces.ServiceIdentifier<IUserRepository>;