class AuthClient {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   */
  constructor(request) {
    this.request = request;
  }

  login(payload) {
    return this.request.post('/login', {
      data: payload,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

module.exports = { AuthClient };
