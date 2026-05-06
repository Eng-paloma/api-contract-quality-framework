class UsersClient {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   */
  constructor(request) {
    this.request = request;
  }

  getUsers() {
    return this.request.get('/users');
  }

  getUserById(userId) {
    return this.request.get(`/users/${userId}`);
  }

  createUser(payload) {
    return this.request.post('/users', {
      data: payload
    });
  }
}

module.exports = { UsersClient };
