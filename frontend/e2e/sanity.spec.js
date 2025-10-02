const { test, expect } = require('@playwright/test');

test('sanity check', async ({ page }) => {
  await page.goto('/');
  expect(true).toBe(true);
});
