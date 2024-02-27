import e from "express";
import { interfaces } from "inversify";

export interface IRouteBuilder {
  build(): e.RequestHandler;
}

export const UserRouterType = Symbol.for('UserRouter') as interfaces.ServiceIdentifier<IRouteBuilder>;
export const AppRouterType = Symbol.for('AppRouter') as interfaces.ServiceIdentifier<IRouteBuilder>;