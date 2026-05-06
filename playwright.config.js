const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './src/tests',
  timeout: 30000,
  retries: 1,
  forbidOnly: !!process.env.CI,
  reporter: [['list'], ['json', { outputFile: 'test-results/results.json' }]],
  use: {
    baseURL: 'https://jsonplaceholder.typicode.com',
    extraHTTPHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    ignoreHTTPSErrors: true,
    request: {
      timeout: 20000
    }
  }
});
