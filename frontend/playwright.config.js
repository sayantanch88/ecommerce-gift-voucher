// playwright.config.js
// Playwright configuration for UI automation

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './e2e',
  timeout: 30000,
  retries: 1,
  ignore: [
    '**/src/components/__tests__/**',
    '**/*.test.{js,jsx,ts,tsx}',
  ],
  reporter: [['list'], ['html', { outputFolder: './e2e/results', open: 'never' }], ['json', { outputFile: './e2e/results/results.json' }]],
  outputDir: './e2e/results',
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    baseURL: 'http://localhost:5173', // Vite default dev server
  },
};

module.exports = config;
