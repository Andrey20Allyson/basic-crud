import { describe, expect, test } from "vitest";
import { AppTestAgent } from "./utils/agent";
import { UserMocker } from "./utils/user-mocker";

describe(`GET /users`, async () => {
  const agent = AppTestAgent();
  const mocker = new UserMocker(agent);

  const PAGE_SIZE = 20;
  const users = await mocker.postMany(4 * PAGE_SIZE);

  test(`Shold return 200 if page has users`, async () => {
    const resp = await agent
      .get('/users?page=2')
      .expect(200);

    expect(resp.body.length)
      .toStrictEqual(20);

    const start = PAGE_SIZE * 2;
    const end = start + PAGE_SIZE;

    expect(resp.body)
      .toEqual(users.slice(start, end));
  });

  test(`Shold return 404 if page is empity`, async () => {
    await agent
      .get('/users?page=4')
      .expect(404);
  });
});