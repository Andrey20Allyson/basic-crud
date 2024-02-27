import 'express-async-errors';
import 'reflect-metadata';
import express from "express";
import { container as defaultContainer } from './ioc/default-container';
import { Container } from "inversify";
import { WebApplicationError } from "./errors/web-app-error";
import { AppRouterType } from "./routes/routes.type";
import { corsMiddleware } from './cors';

export function App(container: Container = defaultContainer): express.Express {
  const app = express();
  
  app.use(corsMiddleware);
  app.use(express.json());
  
  const router = container
    .get(AppRouterType)
    .build();
  
  app.use(router);
  app.use(WebApplicationError.handler());

  return app;
}