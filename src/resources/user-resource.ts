import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IUserService, UserServiceType } from "../services/user-service.type";
import { IUserResource } from "./user-resource.type";
import { UserCreateDTO } from "../dtos/user-create";
import { UserListQueryParams } from "../dtos/user-list";
import { IdPathParams } from "../dtos/path-with-id";
import { UserUpdateDTO } from "../dtos/user-update";
import { UserResponseDTO } from "../dtos/user-response";
import { UserDeleteResponseDTO } from "../dtos/user-delete";

@injectable()
export class UserResource implements IUserResource {
  @inject(UserServiceType)
  readonly service!: IUserService;

  async create(req: Request, res: Response<UserResponseDTO>): Promise<void> {
    const body = UserCreateDTO.parse(req.body);

    const user = await this.service.create(body);

    res
      .status(201)
      .json(user);
  }

  async get(req: Request, res: Response<UserResponseDTO>): Promise<void> {
    const params = IdPathParams.parse(req.params);

    const user = await this.service.get(params.id);

    res
      .status(200)
      .json(user);
  }

  async list(req: Request, res: Response<UserResponseDTO[]>): Promise<void> {
    const query = UserListQueryParams.parse(req.query);

    const users = await this.service.list(query.page);

    res
      .status(200)
      .json(users);
  }

  async update(req: Request, res: Response<UserResponseDTO>): Promise<void> {
    const params = IdPathParams.parse(req.params);
    const body = UserUpdateDTO.parse(req.body);

    const user = await this.service.update(params.id, body);

    res
      .status(200)
      .json(user);
  }
  
  async delete(req: Request, res: Response<UserDeleteResponseDTO>): Promise<void> {
    const params = IdPathParams.parse(req.params);

    const dto = await this.service.delete(params.id);

    res
      .status(200)
      .json(dto);
  }
}