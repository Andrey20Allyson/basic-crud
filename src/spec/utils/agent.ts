import request from 'supertest';
import { App } from "../../app";
import { container } from "../../ioc/test-container";

export function AppTestAgent() {
  const app = App(container);

  return request(app);
}