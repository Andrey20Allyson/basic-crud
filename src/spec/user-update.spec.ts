import { describe, expect, test } from "vitest";
import { AppTestAgent } from "./utils/agent";
import { UserMocker } from "./utils/user-mocker";
import { UserUpdateRequestDTO } from "../dtos/user-update";
import { UserResponseDTO } from "../dtos/user-response";

describe('PUT /users/:id', () => {
  test('Shold update the user', async () => {
    const agent = AppTestAgent();
    const mocker = new UserMocker(agent);

    const { id } = await mocker.post();

    const name = 'Hello World';

    await agent
      .put(`/users/${id}`)
      .send({ name } satisfies UserUpdateRequestDTO)
      .expect(200);

    const resp = await agent
      .get(`/users/${id}`)
      .expect(200);

    const changedUser = resp.body as UserResponseDTO;

    expect(changedUser.name)
      .toStrictEqual(name);
  });
}); 