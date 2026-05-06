const { test, expect } = require('@playwright/test');
const { UsersClient } = require('../api/clients/UsersClient');
const { validateSchema } = require('../api/helpers/schemaValidator');
const userSchema = require('../api/schemas/user.schema.json');

const validUserId = 1;
const newUserPayload = {
  name: 'Quality Engineer',
  email: 'qa@test.com'
};

test.describe('Users API contract tests', () => {
  let usersClient;

  test.beforeEach(({ request }) => {
    usersClient = new UsersClient(request);
  });

  test('GET /users returns a valid user list contract', async () => {
    const response = await usersClient.getUsers();
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const payload = await response.json();
    expect(Array.isArray(payload)).toBeTruthy();
    expect(payload.length).toBeGreaterThan(0);
    
    payload.forEach(user => validateSchema(user, userSchema, 'list user item'));
  });

  test('GET /users/{id} returns a valid single user contract', async () => {
    const response = await usersClient.getUserById(validUserId);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const payload = await response.json();
    validateSchema(payload, userSchema, 'single user item');
    expect(payload.id).toBe(validUserId);
  });

  test('POST /users creates a user and validates the returned contract', async () => {
    const response = await usersClient.createUser(newUserPayload);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);

    const createdUser = await response.json();
    validateSchema(createdUser, userSchema, 'created user');
    expect(createdUser.name).toBe(newUserPayload.name);
  });
});
