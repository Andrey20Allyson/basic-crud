import { inject, injectable } from "inversify";
import { UserResponseDTO } from "../dtos/user-response";
import { IUserRepository, UserRepositoryType } from "../repositories/user-repository.type";
import { IUserService } from "./user-service.type";
import { WebApplicationError } from "../errors/web-app-error";
import { UserCreateDTO } from "../dtos/user-create";
import { UserModel } from "../models/user-model";
import { PasswordUpdate, UserUpdateDTO } from "../dtos/user-update";
import { UserDeleteResponseDTO } from "../dtos/user-delete";
import { HashServiceType, IHashService } from "./hash-service.type";

@injectable()
export class UserService implements IUserService {
  @inject(HashServiceType)
  readonly hasher!: IHashService;

  @inject(UserRepositoryType)
  readonly repository!: IUserRepository;

  async get(id: number): Promise<UserResponseDTO> {
    const model = await this._getModel(id);

    return UserResponseDTO.from(model);
  }

  async list(page?: number): Promise<UserResponseDTO[]> {
    const models = await this.repository.list({ page });
    if (models.length === 0) {
      return new WebApplicationError(
        `Página ${page} está vazia`,
        404,
      ).reject();
    }

    return models.map(UserResponseDTO.from);
  }

  async create(data: UserCreateDTO): Promise<UserResponseDTO> {
    let model = new UserModel(
      null,
      data.name,
      data.birthDate,
      await this.hasher.hash(data.password.value),
    );

    model = await this.repository.save(model);

    return UserResponseDTO.from(model);
  }

  async update(id: number, data: UserUpdateDTO): Promise<UserResponseDTO> {
    let model = await this._getModel(id);

    model = await this
      ._changePassword(model, data.password);

    model = model
      .setBirthDate(data.birthDate)
      .setName(data.name);

    await this.repository.save(model);

    return UserResponseDTO.from(model);
  }

  async delete(id: number): Promise<UserDeleteResponseDTO> {
    const deleted = await this.repository.delete(id);

    return new UserDeleteResponseDTO(deleted);
  }

  private async _getModel(id: number): Promise<UserModel> {
    const model = await this.repository.findById(id);
    if (model === null) {
      return new WebApplicationError(
        `Usuário com id ${id} não existe`,
        404,
      ).reject();
    }

    return model;
  }

  private async _changePassword(model: UserModel, password?: PasswordUpdate): Promise<UserModel> {
    if (password === undefined) return model;

    const matches = await this.hasher.compare(password.old.value, model.passwordHash);

    if (matches === false) {
      throw new WebApplicationError(
        `Senha incorreta`,
        401,
      );
    }

    return model.setPasswordHash(password.new.value);
  }
}