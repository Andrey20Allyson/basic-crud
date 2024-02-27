import { describe, expect, test } from 'vitest';
import { AppTestAgent } from './utils/agent';
import { UserMocker } from './utils/user-mocker';

describe(`GET /users/:id`, async () => {
  const agent = AppTestAgent();
  const mocker = new UserMocker(agent);

  const users = await mocker.postMany(4);

  test(`Shold return 200 if user exists`, async () => {
    await agent
      .get(`/users/1`)
      .expect(200);
  });

  test(`Shold return 404 if user not exists`, async () => {
    await agent
      .get('/users/10')
      .expect(404);
  });

  test(`Shold return the exact user from id`, async () => {
    const userToGet = users[3];

    const resp = await agent
      .get(`/users/${userToGet.id}`)
      .expect(200);

    expect(resp.body)
      .deep
      .equal(userToGet);
  });
});