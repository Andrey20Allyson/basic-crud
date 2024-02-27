import e from "express";
import { interfaces } from "inversify";
import { UserResponseDTO } from "../dtos/user-response";
import { UserDeleteResponseDTO } from "../dtos/user-delete";

export interface IUserResource {
  create(req: e.Request, res: e.Response<UserResponseDTO>): Promise<void>;
  get(req: e.Request, res: e.Response<UserResponseDTO>): Promise<void>;
  list(req: e.Request, res: e.Response<UserResponseDTO[]>): Promise<void>;
  update(req: e.Request, res: e.Response<UserResponseDTO>): Promise<void>;
  delete(req: e.Request, res: e.Response<UserDeleteResponseDTO>): Promise<void>;
}

export const UserResourceType = Symbol.for('UserResource') as interfaces.ServiceIdentifier<IUserResource>;