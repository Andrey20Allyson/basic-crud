import { RequestHandler, Router } from "express";
import { IRouteBuilder } from "./routes.type";
import { IUserResource, UserResourceType } from "../resources/user-resource.type";
import { inject, injectable } from "inversify";

@injectable()
export class UserRouter implements IRouteBuilder {
  @inject(UserResourceType)
  readonly resource!: IUserResource;

  build(): RequestHandler {
    const router = Router();
    const { resource } = this;

    router.get('/', resource.list.bind(resource));
    
    router.get('/:id', resource.get.bind(resource));

    router.post('/', resource.create.bind(resource));

    router.put('/:id', resource.update.bind(resource));

    router.delete('/:id', resource.delete.bind(resource));

    return router;
  }
}