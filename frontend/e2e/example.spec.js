// example.spec.js
// Example Playwright test for the Gift Voucher App

const { test, expect } = require('@playwright/test');

test.describe('Gift Voucher App UI', () => {
  test('should load homepage and display header', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('text=Gift Voucher')).toBeVisible();
  });
});
