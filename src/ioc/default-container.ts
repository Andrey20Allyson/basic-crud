import { Container } from "inversify";
import { IUserRepository, UserRepositoryType } from "../repositories/user-repository.type";
import { PrismaUserRepository } from "../repositories/user-repository";
import { IUserService, UserServiceType } from "../services/user-service.type";
import { UserService } from "../services/user-service";
import { IUserResource, UserResourceType } from "../resources/user-resource.type";
import { UserResource } from "../resources/user-resource";
import { AppRouterType, IRouteBuilder, UserRouterType } from "../routes/routes.type";
import { UserRouter } from "../routes/user-router";
import { AppRouter } from "../routes/app-router";
import { PrismaClientType } from "../database/prisma-client";
import { PrismaClient } from "@prisma/client";
import { HashServiceType, IHashService } from "../services/hash-service.type";
import { BcryptHashService } from "../services/bcrypt-hash-service";

export const container = new Container();

container
  .bind(PrismaClientType)
  .toDynamicValue(() => new PrismaClient());

container
  .bind<IUserRepository>(UserRepositoryType)
  .to(PrismaUserRepository);

container
  .bind(HashServiceType)
  .to(BcryptHashService);

container
  .bind<IUserService>(UserServiceType)
  .to(UserService);

container
  .bind<IUserResource>(UserResourceType)
  .to(UserResource);

container
  .bind<IRouteBuilder>(UserRouterType)
  .to(UserRouter);

container
  .bind<IRouteBuilder>(AppRouterType)
  .to(AppRouter);