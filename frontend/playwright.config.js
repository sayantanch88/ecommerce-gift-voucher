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
  reporter: [['list'], ['html', { outputFolder: './e2e/results', open: 'never' }], ['json', { outputFile: './e2e/results/results.json' }]],
  outputDir: './e2e/results',
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
  },
  outputDir: require('path').resolve(__dirname, 'e2e/results'),
  reporter: [
    ['list'],
    ['html', { outputFolder: require('path').resolve(__dirname, 'e2e/results'), open: 'never' }],
    ['json', { outputFile: require('path').resolve(__dirname, 'e2e/results/results.json') }],
  ],
};

module.exports = config;
