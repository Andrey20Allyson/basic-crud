import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import { PrismaClientType } from "../database/prisma-client";
import { UserModel } from "../models/user-model";
import { IUserRepository, ListUserOptions } from "./user-repository.type";

@injectable()
export class PrismaUserRepository implements IUserRepository {
  @inject(PrismaClientType)
  readonly client!: PrismaClient;

  async save(model: UserModel): Promise<UserModel> {
    if (model.id === null) {
      return this._create(model);
    }

    return this._update(model.id, model);
  }

  async findById(id: number): Promise<UserModel | null> {
    const entity = await this.client.user.findFirst({
      where: {
        id,
      }
    });
    if (entity === null) return null;

    return UserModel.fromEntity(entity);
  }

  async list(options: ListUserOptions = {}): Promise<UserModel[]> {
    const {
      page = 0,
      pageSize = 20,
    } = options;

    const entities = await this.client.user.findMany({
      skip: page * pageSize,
      take: pageSize,
    });

    return entities.map(UserModel.fromEntity);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.client.user.delete({
      where: {
        id,
      }
    });

    return result !== null;
  }

  async _create(model: UserModel): Promise<UserModel> {
    const entity = await this.client.user.create({
      data: {
        name: model.name.value,
        birth_date: model.birthDate.value,
        password_hash: model.passwordHash,
      }
    });

    return UserModel.fromEntity(entity);
  }

  async _update(id: number, model: UserModel): Promise<UserModel> {
    const entity = await this.client.user.update({
      data: {
        birth_date: model.birthDate.value,
        name: model.name.value,
        password_hash: model.passwordHash,
      },
      where: {
        id,
      },
    });

    return UserModel.fromEntity(entity);
  }
}