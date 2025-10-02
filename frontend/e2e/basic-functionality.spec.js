// basic-functionality.spec.js
// Basic functionality and sanity tests for the Gift Voucher App

const { test, expect } = require('@playwright/test');

test.describe('Basic Application Functionality', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the application before each test
    await page.goto('/');
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
  });

  test.describe('Sanity Checks', () => {
    
    test('basic sanity check - application loads', async ({ page }) => {
      // Simple sanity check to ensure the application loads
      expect(true).toBe(true);
      await expect(page).toHaveURL(/localhost:5173|localhost:3000/);
    });

    test('page loads without JavaScript errors', async ({ page }) => {
      // Listen for console errors
      const errors = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Check that no critical JavaScript errors occurred
      const criticalErrors = errors.filter(error => 
        !error.includes('404') && // Ignore 404 errors for missing resources
        !error.includes('DevTools') // Ignore DevTools related messages
      );
      
      expect(criticalErrors).toHaveLength(0);
    });
  });

  test.describe('Header and Navigation', () => {
    
    test('should load homepage and display header correctly', async ({ page }) => {
      // Verify header is visible
      await expect(page.locator('header')).toBeVisible();
      
      // Verify logo text
      await expect(page.locator('header .cr-header-logo')).toHaveText('FREEDOM');
      
      // Verify welcome message
      await expect(page.locator('header').locator('text=Welcome')).toBeVisible();
      
      // Verify cart display
      await expect(page.locator('header').locator('text=Cart')).toBeVisible();
    });

    test('header contains expected navigation elements', async ({ page }) => {
      const header = page.locator('header');
      
      // Check for logo
      await expect(header.locator('.cr-header-logo')).toBeVisible();
      
      // Check for cart information
      await expect(header.locator('text=🛒 Cart')).toBeVisible();
      
      // Check for user greeting
      await expect(header.locator('text=Welcome, Jane Doe')).toBeVisible();
    });
  });

  test.describe('Page Structure and Content', () => {
    
    test('main content area is present and visible', async ({ page }) => {
      // Verify main content area
      await expect(page.locator('main')).toBeVisible();
      
      // Verify page heading
      await expect(page.locator('h2').filter({ hasText: 'Furniture and Homewares' })).toBeVisible();
    });

    test('footer is present and contains required information', async ({ page }) => {
      // Verify footer exists
      await expect(page.locator('footer')).toBeVisible();
      
      // Verify copyright notice
      await expect(page.locator('footer').locator('text=© 2025 Freedom. All rights reserved.')).toBeVisible();
      
      // Verify disclaimer
      await expect(page.locator('footer').locator('text=This is a demo purpose app')).toBeVisible();
    });
  });

  test.describe('Basic Product Display', () => {
    
    test('products are displayed on the page', async ({ page }) => {
      // Wait for products to load
      await page.waitForSelector('main > div > div', { timeout: 10000 });
      
      // Verify at least one product is displayed
      const productCards = page.locator('main > div > div');
      const productCount = await productCards.count();
      expect(productCount).toBeGreaterThan(0);
      
      // Verify first product has required elements
      const firstProduct = productCards.first();
      await expect(firstProduct.locator('img')).toBeVisible();
      await expect(firstProduct.locator('div').nth(1)).toBeVisible(); // Product name
      await expect(firstProduct.locator('button').filter({ hasText: 'Add to Cart' })).toBeVisible();
    });

    test('product images load correctly', async ({ page }) => {
      // Wait for products to load
      await page.waitForSelector('main > div > div img', { timeout: 10000 });
      
      // Get all product images
      const images = page.locator('main > div > div img');
      const imageCount = await images.count();
      
      expect(imageCount).toBeGreaterThan(0);
      
      // Check that at least the first image loads properly
      const firstImage = images.first();
      await expect(firstImage).toBeVisible();
      
      // Verify image has alt text
      const altText = await firstImage.getAttribute('alt');
      expect(altText).toBeTruthy();
    });
  });

  test.describe('Basic Interactivity', () => {
    
    test('Add to Cart buttons are clickable', async ({ page }) => {
      // Wait for products to load
      await page.waitForSelector('button:has-text("Add to Cart")', { timeout: 10000 });
      
      // Find and click the first Add to Cart button
      const addToCartButton = page.locator('button').filter({ hasText: 'Add to Cart' }).first();
      await expect(addToCartButton).toBeVisible();
      await expect(addToCartButton).toBeEnabled();
      
      // Click the button (this tests basic interactivity)
      await addToCartButton.click();
      
      // The button should still be visible after clicking
      await expect(addToCartButton).toBeVisible();
    });

    test('page is responsive to window resizing', async ({ page }) => {
      // Test desktop view
      await page.setViewportSize({ width: 1920, height: 1080 });
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      
      // Test tablet view
      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      
      // Test mobile view
      await page.setViewportSize({ width: 375, height: 667 });
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
    });
  });

  test.describe('Performance and Accessibility', () => {
    
    test('page loads within reasonable time', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      
      // Page should load within 5 seconds
      expect(loadTime).toBeLessThan(5000);
    });

    test('page has proper title and meta information', async ({ page }) => {
      await expect(page).toHaveTitle(/Freedom Storefront|Gift Voucher/);
    });

    test('images have proper alt attributes for accessibility', async ({ page }) => {
      // Wait for images to load
      await page.waitForSelector('img', { timeout: 10000 });
      
      const images = page.locator('img');
      const imageCount = await images.count();
      
      if (imageCount > 0) {
        // Check that at least some images have alt text
        for (let i = 0; i < Math.min(3, imageCount); i++) {
          const image = images.nth(i);
          const altText = await image.getAttribute('alt');
          expect(altText).toBeTruthy();
        }
      }
    });
  });
});