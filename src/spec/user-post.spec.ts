import { describe, expect, test } from "vitest";
import { UserCreateRequestDTO } from "../dtos/user-create";
import { AppTestAgent } from "./utils/agent";

describe('POST /users', () => {
  test(`Shold return 201 when create a user`, async () => {
    const agent = AppTestAgent();

    await agent
      .post('/users')
      .send({
        birthDate: new Date(2000, 0, 1),
        name: 'John Due',
        password: '123456',
      } satisfies UserCreateRequestDTO)
      .expect(201)
      .expect(res => expect(res.body.id)
        .toStrictEqual(1));
  });

  test(`Shold return 422 if password is less than 6 characters`, async () => {
    const agent = AppTestAgent();

    await agent
      .post('/users')
      .send({
        birthDate: new Date(2000, 0, 1),
        name: 'John Due',
        password: '12345',
      } satisfies UserCreateRequestDTO)
      .expect(422);
  });
});