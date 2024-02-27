import { injectable } from "inversify";
import { UserModel } from "../models/user-model";
import { IUserRepository, ListUserOptions } from "./user-repository.type";

@injectable()
export class UserRepositoryMock implements IUserRepository {
  private _idCount: number = 1;
  private _users: UserModel[] = [];

  async delete(id: number): Promise<boolean> {
    const removeIndex = this._users.findIndex(user => user.id === id);
    if (removeIndex === -1) return false;

    this._users.splice(removeIndex, 1);
    return true;
  }

  async findById(id: number): Promise<UserModel | null> {
    return this._users.find(user => user.id === id) ?? null;
  }

  async list(options: ListUserOptions = {}): Promise<UserModel[]> {
    const {
      page = 0,
      pageSize = 20,
    } = options;

    const start = page * pageSize;
    const end = start + pageSize;

    const users = this._users.slice(
      start,
      end,
    );

    return users;
  }

  async save(model: UserModel): Promise<UserModel> {
    const { id } = model;
    
    if (id === null) {
      const newUser = model.setId(this._idCount++);
      
      if (this._users.some(user => user.name === model.name)) {
        throw new Error(`Esse nome de usuário já existe`);
      }
      
      this._users.push(newUser);

      return newUser;
    }

    const changeIndex = this._users.findIndex(user => user.id === id);
    if (changeIndex === -1) throw new Error(`Usuário com id ${id} não existe`);

    this._users[changeIndex] = model;

    return model;
  }
}