import { RequestHandler, Router } from "express";
import { inject, injectable } from "inversify";
import { IRouteBuilder, UserRouterType } from "./routes.type";

@injectable()
export class AppRouter implements IRouteBuilder {
  @inject(UserRouterType)
  readonly userRouter!: IRouteBuilder;

  build(): RequestHandler {
    const router = Router();
    const { userRouter } = this;

    router.use('/users', userRouter.build());

    return router;
  }
}