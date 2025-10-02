// playwright.config.js
// Playwright configuration for UI automation

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './e2e',
  timeout: 30000,
  retries: 1,
  ignore: [
    '**/*.test.jsx',
    '**/*.test.{js,jsx,ts,tsx}',
    '**/__tests__/**',
    '**/src/components/__tests__/**'
  ],
  // Configure all outputs to be under e2e directory
  outputDir: './e2e/test-results',
  reporter: [
    ['list'],
    ['html', { outputFolder: './e2e/playwright-report', open: 'never' }],
    ['json', { outputFile: './e2e/test-results/results.json' }],
  ],
  use: {
    baseURL: 'http://localhost:5174', // Updated to match current Vite dev server port
    headless: true,
    // Store screenshots and videos in e2e directory
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
};

module.exports = config;
