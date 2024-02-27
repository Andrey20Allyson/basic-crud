import { describe, test } from "vitest";
import { AppTestAgent } from "./utils/agent";
import { UserMocker } from "./utils/user-mocker";

describe('DELETE /users/:id', () => {
  test('GET shold return 404 if the user has deleted', async () => {
    const agent = AppTestAgent();
    const mocker = new UserMocker(agent);

    const users = await mocker.postMany(10);
    const user = users[4];

    await agent
      .get(`/users/${user.id}`)
      .expect(200);

    await agent
      .delete(`/users/${user.id}`)
      .expect(200);

    await agent
      .get(`/users/${user.id}`)
      .expect(404);
  });
});