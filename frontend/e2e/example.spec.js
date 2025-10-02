// example.spec.js
// Example Playwright test for the Gift Voucher App

const { test, expect } = require('@playwright/test');

test('should load homepage and display header', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('header')).toBeVisible();
  await expect(page.locator('header .cr-header-logo')).toHaveText('FREEDOM');
  await expect(page.locator('header').locator('text=Welcome')).toBeVisible();
});
