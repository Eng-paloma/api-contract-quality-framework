const { test, expect } = require('@playwright/test');
const { UsersClient } = require('../api/clients/UsersClient');

test.describe('Negative API contract tests', () => {
  let usersClient;

  test.beforeEach(({ request }) => {
    usersClient = new UsersClient(request);
  });

  test('GET /users/{id} with invalid id should return not found', async () => {
    const invalidUserId = 9999999;
    const response = await usersClient.getUserById(invalidUserId);

    expect(response.status()).toBe(404);
  });

  test('POST /users with valid payload should return success', async () => {
    const validPayload = {
      name: 'Test User',
      email: 'testuser@test.com'
    };
    const response = await usersClient.createUser(validPayload);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);

    const payload = await response.json();
    expect(payload).toHaveProperty('name', validPayload.name);
    expect(payload).toHaveProperty('email', validPayload.email);
  });
});
