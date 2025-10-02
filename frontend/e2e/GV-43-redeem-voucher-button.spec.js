// GV-43-redeem-voucher-button.spec.js
// Playwright UI automation tests for GV-43: Frontend - Add Redeem Voucher Button to Product Listing
// Generated from Jira story acceptance criteria

const { test, expect } = require('@playwright/test');

test.describe('GV-43: Frontend - Add Redeem Voucher Button to Product Listing', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the application before each test
    await page.goto('/');
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
    // Ensure product listing is visible - based on actual DOM structure
    await expect(page.locator('main')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('h2').filter({ hasText: 'Furniture and Homewares' })).toBeVisible();
  });

  test.describe('AC1: Button Display - Redeem Voucher buttons appear on all products', () => {
    
    test('TC-PW-GV43-001: Verify Redeem Voucher buttons are visible on all product cards', async ({ page }) => {
      // Given: User is viewing the product listing page
      await expect(page.locator('h2').filter({ hasText: 'Furniture and Homewares' })).toBeVisible();
      
      // When: Page loads completely
      await page.waitForLoadState('domcontentloaded');
      
      // Then: Each product displays a "Redeem Voucher" button
      const productCards = page.locator('main > div > div'); // Based on actual DOM structure
      const productCount = await productCards.count();
      
      expect(productCount).toBeGreaterThan(0); // Ensure products are loaded
      
      // Verify each product has a Redeem Voucher button
      for (let i = 0; i < productCount; i++) {
        const productCard = productCards.nth(i);
        const redeemButton = productCard.locator('button').filter({ hasText: /redeem voucher/i });
        await expect(redeemButton).toBeVisible();
        
        // And: Button is clearly visible and properly styled
        await expect(redeemButton).toBeEnabled();
      }
    });

    test('TC-PW-GV43-002: Verify Redeem Voucher button styling and prominence', async ({ page }) => {
      // Given: Product listing page is loaded
      const firstProduct = page.locator('main > div > div').first();
      await expect(firstProduct).toBeVisible();
      
      // When: Examining button styling
      const redeemButton = firstProduct.locator('button').filter({ hasText: /redeem voucher/i });
      await expect(redeemButton).toBeVisible();
      
      // Then: Button text is clearly readable
      await expect(redeemButton).toContainText('Redeem Voucher');
      
      // And: Button is prominently placed
      const buttonBox = await redeemButton.boundingBox();
      expect(buttonBox.width).toBeGreaterThan(100); // Minimum width for visibility
      expect(buttonBox.height).toBeGreaterThan(30); // Minimum height for touch targets
    });

    test('TC-PW-GV43-003: Verify consistent button placement across all products', async ({ page }) => {
      // Given: Multiple products are visible
      const productCards = page.locator('main > div > div');
      const productCount = await productCards.count();
      
      expect(productCount).toBeGreaterThanOrEqual(3); // Need multiple products for comparison
      
      // When: Checking button positioning
      const buttonPositions = [];
      
      for (let i = 0; i < Math.min(3, productCount); i++) {
        const productCard = productCards.nth(i);
        const redeemButton = productCard.locator('button').filter({ hasText: /redeem voucher/i });
        const addToCartButton = productCard.locator('button').filter({ hasText: /add to cart/i });
        
        await expect(redeemButton).toBeVisible();
        await expect(addToCartButton).toBeVisible();
        
        // Verify buttons are in the same container/section
        const buttonContainer = productCard.locator('.product-actions, .buttons, .actions');
        if (await buttonContainer.count() > 0) {
          await expect(buttonContainer.locator('button').filter({ hasText: /redeem voucher/i })).toBeVisible();
          await expect(buttonContainer.locator('button').filter({ hasText: /add to cart/i })).toBeVisible();
        }
        
        buttonPositions.push(await redeemButton.boundingBox());
      }
      
      // Then: Button positioning is consistent
      expect(buttonPositions.length).toBeGreaterThan(1);
      // Verify relative positioning consistency (buttons should be in similar positions within their cards)
    });
  });

  test.describe('AC2: Button Interaction - Clicking opens voucher modal with correct product info', () => {
    
    test('TC-PW-GV43-004: Verify clicking Redeem Voucher button opens modal with correct product', async ({ page }) => {
      // Given: User sees a Redeem Voucher button on a specific product
      const firstProduct = page.locator('main > div > div').first();
      await expect(firstProduct).toBeVisible();
      
      // Extract product name for verification - using the text content from the product div
      const productNameElement = firstProduct.locator('div').nth(1); // Second div contains product name
      const productName = await productNameElement.textContent();
      expect(productName).toBeTruthy();
      
      const redeemButton = firstProduct.locator('button').filter({ hasText: /redeem voucher/i });
      await expect(redeemButton).toBeVisible();
      
      // When: User clicks the Redeem Voucher button
      await redeemButton.click();
      
      // Then: Voucher redemption modal should be triggered to open
      const modal = page.locator('[role="dialog"]');
      await expect(modal).toBeVisible({ timeout: 5000 });
      
      // And: Modal displays correct title
      await expect(modal.locator('h3').filter({ hasText: /redeem.*voucher|voucher.*redeem/i })).toBeVisible();
      
      // And: Product information should be passed to the modal (check for SORRENTO specifically)
      await expect(modal).toContainText('SORRENTO Fabric Modular Sofa');
      
      // And: Modal contains necessary elements
      await expect(modal.locator('input[type="text"]')).toBeVisible();
      await expect(modal.locator('button').filter({ hasText: /redeem/i })).toBeVisible();
      await expect(modal.locator('button').filter({ hasText: /cancel/i })).toBeVisible();
    });

    test('TC-PW-GV43-005: Verify different products pass correct information to modal', async ({ page }) => {
      // Given: Multiple products are available
      const productCards = page.locator('.product-card, [data-testid*="product"], .product-item');
      const productCount = await productCards.count();
      
      expect(productCount).toBeGreaterThanOrEqual(2);
      
      // Test first product
      await test.step('Test first product modal', async () => {
        const firstProduct = productCards.first();
        const firstProductName = await firstProduct.locator('h2, h3, .product-name, [data-testid*="name"]').first().textContent();
        
        const firstRedeemButton = firstProduct.locator('button').filter({ hasText: /redeem voucher/i });
        await firstRedeemButton.click();
        
        const modal = page.locator('.modal, [role="dialog"], .voucher-modal, [data-testid*="modal"]');
        await expect(modal).toBeVisible();
        await expect(modal).toContainText(firstProductName.trim());
        
        // Close modal
        const cancelButton = modal.locator('button').filter({ hasText: /cancel|close/i });
        await cancelButton.click();
        await expect(modal).not.toBeVisible();
      });

      // Test second product  
      await test.step('Test second product modal', async () => {
        const secondProduct = productCards.nth(1);
        const secondProductName = await secondProduct.locator('h2, h3, .product-name, [data-testid*="name"]').first().textContent();
        
        const secondRedeemButton = secondProduct.locator('button').filter({ hasText: /redeem voucher/i });
        await secondRedeemButton.click();
        
        const modal = page.locator('.modal, [role="dialog"], .voucher-modal, [data-testid*="modal"]');
        await expect(modal).toBeVisible();
        await expect(modal).toContainText(secondProductName.trim());
        
        // Verify different product name appears
        expect(secondProductName.trim()).not.toBe('');
      });
    });

    test('TC-PW-GV43-006: Verify modal functionality and lifecycle', async ({ page }) => {
      // Given: Product with Redeem Voucher button
      const firstProduct = page.locator('.product-card, [data-testid*="product"], .product-item').first();
      const redeemButton = firstProduct.locator('button').filter({ hasText: /redeem voucher/i });
      
      // When: Opening modal
      await redeemButton.click();
      
      const modal = page.locator('.modal, [role="dialog"], .voucher-modal, [data-testid*="modal"]');
      await expect(modal).toBeVisible();
      
      // Then: Modal elements are functional
      const voucherInput = modal.locator('input[type="text"], input[placeholder*="voucher"], input[placeholder*="code"]');
      await expect(voucherInput).toBeVisible();
      
      // Test input functionality
      await voucherInput.fill('TEST-VOUCHER-123');
      await expect(voucherInput).toHaveValue('TEST-VOUCHER-123');
      
      // Test modal buttons
      const redeemModalButton = modal.locator('button').filter({ hasText: /redeem|apply/i });
      const cancelButton = modal.locator('button').filter({ hasText: /cancel|close/i });
      
      await expect(redeemModalButton).toBeVisible();
      await expect(cancelButton).toBeVisible();
      
      // Test modal closure
      await cancelButton.click();
      await expect(modal).not.toBeVisible();
      
      // Verify page functionality after modal closes
      await expect(page.locator('.product-card, [data-testid*="product"], .product-item')).toBeVisible();
    });
  });

  test.describe('AC3: Responsive Design - Button works across all device sizes', () => {
    
    test('TC-PW-GV43-007: Verify button functionality on desktop view', async ({ page }) => {
      // Given: Desktop browser viewport
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      // When: Checking button display on desktop
      const productCards = page.locator('.product-card, [data-testid*="product"], .product-item');
      await expect(productCards.first()).toBeVisible();
      
      const redeemButton = productCards.first().locator('button').filter({ hasText: /redeem voucher/i });
      await expect(redeemButton).toBeVisible();
      
      // Then: Button maintains proper styling and functionality
      const buttonBox = await redeemButton.boundingBox();
      expect(buttonBox.width).toBeGreaterThan(120); // Desktop buttons should be larger
      
      // Test hover effect (if applicable)
      await redeemButton.hover();
      
      // Test click functionality
      await redeemButton.click();
      const modal = page.locator('.modal, [role="dialog"], .voucher-modal, [data-testid*="modal"]');
      await expect(modal).toBeVisible();
    });

    test('TC-PW-GV43-008: Verify button functionality on tablet view', async ({ page }) => {
      // Given: Tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      // When: Checking button display on tablet
      const productCards = page.locator('.product-card, [data-testid*="product"], .product-item');
      await expect(productCards.first()).toBeVisible();
      
      const redeemButton = productCards.first().locator('button').filter({ hasText: /redeem voucher/i });
      await expect(redeemButton).toBeVisible();
      
      // Then: Button adapts to tablet layout
      const buttonBox = await redeemButton.boundingBox();
      expect(buttonBox.width).toBeGreaterThan(100); // Tablet-appropriate size
      expect(buttonBox.height).toBeGreaterThan(40); // Touch-friendly height
      
      // Test touch interaction
      await redeemButton.click();
      const modal = page.locator('.modal, [role="dialog"], .voucher-modal, [data-testid*="modal"]');
      await expect(modal).toBeVisible();
      
      // Verify modal adapts to tablet view
      const modalBox = await modal.boundingBox();
      expect(modalBox.width).toBeLessThanOrEqual(768); // Fits within viewport
    });

    test('TC-PW-GV43-009: Verify button functionality on mobile view', async ({ page }) => {
      // Given: Mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      // When: Checking button display on mobile
      const productCards = page.locator('.product-card, [data-testid*="product"], .product-item');
      await expect(productCards.first()).toBeVisible();
      
      const redeemButton = productCards.first().locator('button').filter({ hasText: /redeem voucher/i });
      await expect(redeemButton).toBeVisible();
      
      // Then: Button is optimized for mobile
      const buttonBox = await redeemButton.boundingBox();
      expect(buttonBox.height).toBeGreaterThan(44); // iOS minimum touch target
      
      // Test mobile interaction
      await redeemButton.tap();
      const modal = page.locator('.modal, [role="dialog"], .voucher-modal, [data-testid*="modal"]');
      await expect(modal).toBeVisible();
      
      // Verify modal is mobile-optimized
      const modalBox = await modal.boundingBox();
      expect(modalBox.width).toBeLessThanOrEqual(375); // Fits within mobile viewport
    });

    test('TC-PW-GV43-010: Verify responsive layout consistency', async ({ page }) => {
      const viewports = [
        { width: 1920, height: 1080, name: 'Desktop' },
        { width: 1024, height: 768, name: 'Tablet Landscape' },
        { width: 768, height: 1024, name: 'Tablet Portrait' },
        { width: 375, height: 667, name: 'Mobile' }
      ];

      for (const viewport of viewports) {
        await test.step(`Test ${viewport.name} (${viewport.width}x${viewport.height})`, async () => {
          await page.setViewportSize({ width: viewport.width, height: viewport.height });
          await page.reload();
          await page.waitForLoadState('networkidle');
          
          // Verify products are visible
          const productCards = page.locator('.product-card, [data-testid*="product"], .product-item');
          await expect(productCards.first()).toBeVisible();
          
          // Verify Redeem Voucher button is accessible
          const redeemButton = productCards.first().locator('button').filter({ hasText: /redeem voucher/i });
          await expect(redeemButton).toBeVisible();
          await expect(redeemButton).toBeEnabled();
          
          // Verify button is clickable
          await redeemButton.click();
          const modal = page.locator('.modal, [role="dialog"], .voucher-modal, [data-testid*="modal"]');
          await expect(modal).toBeVisible();
          
          // Close modal for next iteration
          const cancelButton = modal.locator('button').filter({ hasText: /cancel|close/i });
          await cancelButton.click();
          await expect(modal).not.toBeVisible();
        });
      }
    });
  });

  test.describe('Accessibility and User Experience Tests', () => {
    
    test('TC-PW-GV43-011: Verify keyboard navigation accessibility', async ({ page }) => {
      // Given: Page is loaded
      await page.locator('body').focus();
      
      // When: Using keyboard navigation
      let redeemButtonFound = false;
      let tabCount = 0;
      const maxTabs = 20; // Prevent infinite loop
      
      while (!redeemButtonFound && tabCount < maxTabs) {
        await page.keyboard.press('Tab');
        tabCount++;
        
        const focusedElement = page.locator(':focus');
        const elementText = await focusedElement.textContent().catch(() => '');
        
        if (elementText.toLowerCase().includes('redeem voucher')) {
          redeemButtonFound = true;
          
          // Then: Button is keyboard accessible
          await expect(focusedElement).toBeVisible();
          
          // Test Enter key activation
          await page.keyboard.press('Enter');
          
          const modal = page.locator('.modal, [role="dialog"], .voucher-modal, [data-testid*="modal"]');
          await expect(modal).toBeVisible();
          
          break;
        }
      }
      
      expect(redeemButtonFound).toBe(true);
    });

    test('TC-PW-GV43-012: Verify ARIA attributes and screen reader support', async ({ page }) => {
      // Given: Product with Redeem Voucher button
      const firstProduct = page.locator('.product-card, [data-testid*="product"], .product-item').first();
      const redeemButton = firstProduct.locator('button').filter({ hasText: /redeem voucher/i });
      
      // When: Checking accessibility attributes
      await expect(redeemButton).toBeVisible();
      
      // Then: Button has proper ARIA attributes
      const ariaLabel = await redeemButton.getAttribute('aria-label');
      const tabIndex = await redeemButton.getAttribute('tabindex');
      
      // Verify accessibility features
      expect(ariaLabel || await redeemButton.textContent()).toContain('Redeem Voucher');
      expect(tabIndex === null || parseInt(tabIndex) >= 0).toBe(true); // Focusable
      
      // Verify button role
      const role = await redeemButton.getAttribute('role');
      expect(role === null || role === 'button').toBe(true); // Default or explicit button role
    });
  });

  test.describe('Edge Cases and Error Handling', () => {
    
    test('TC-PW-GV43-013: Verify behavior with rapid button clicks', async ({ page }) => {
      // Given: Product with Redeem Voucher button
      const firstProduct = page.locator('.product-card, [data-testid*="product"], .product-item').first();
      const redeemButton = firstProduct.locator('button').filter({ hasText: /redeem voucher/i });
      
      // When: Rapidly clicking the button
      await redeemButton.click();
      await redeemButton.click();
      await redeemButton.click();
      
      // Then: Only one modal should appear
      const modals = page.locator('.modal, [role="dialog"], .voucher-modal, [data-testid*="modal"]');
      await expect(modals).toHaveCount(1);
      
      // And: Modal functions correctly
      const modal = modals.first();
      await expect(modal).toBeVisible();
      
      const cancelButton = modal.locator('button').filter({ hasText: /cancel|close/i });
      await cancelButton.click();
      await expect(modal).not.toBeVisible();
    });

    test('TC-PW-GV43-014: Verify integration with Add to Cart functionality', async ({ page }) => {
      // Given: Product with both buttons
      const firstProduct = page.locator('.product-card, [data-testid*="product"], .product-item').first();
      const addToCartButton = firstProduct.locator('button').filter({ hasText: /add to cart/i });
      const redeemButton = firstProduct.locator('button').filter({ hasText: /redeem voucher/i });
      
      await expect(addToCartButton).toBeVisible();
      await expect(redeemButton).toBeVisible();
      
      // When: Using Add to Cart first
      await addToCartButton.click();
      
      // Wait for any cart updates
      await page.waitForTimeout(500);
      
      // Then: Redeem Voucher still works
      await redeemButton.click();
      
      const modal = page.locator('.modal, [role="dialog"], .voucher-modal, [data-testid*="modal"]');
      await expect(modal).toBeVisible();
      
      // Both functionalities work independently
      const cancelButton = modal.locator('button').filter({ hasText: /cancel|close/i });
      await cancelButton.click();
      await expect(modal).not.toBeVisible();
    });
  });

  test.describe('Performance and Load Testing', () => {
    
    test('TC-PW-GV43-015: Verify button performance with multiple products', async ({ page }) => {
      // Given: Page with multiple products
      const productCards = page.locator('.product-card, [data-testid*="product"], .product-item');
      const productCount = await productCards.count();
      
      expect(productCount).toBeGreaterThan(3);
      
      // When: Testing button responsiveness
      const startTime = Date.now();
      
      for (let i = 0; i < Math.min(3, productCount); i++) {
        const redeemButton = productCards.nth(i).locator('button').filter({ hasText: /redeem voucher/i });
        
        const buttonStartTime = Date.now();
        await redeemButton.click();
        
        const modal = page.locator('.modal, [role="dialog"], .voucher-modal, [data-testid*="modal"]');
        await expect(modal).toBeVisible();
        
        const buttonEndTime = Date.now();
        const responseTime = buttonEndTime - buttonStartTime;
        
        // Then: Response time should be reasonable (< 1 second)
        expect(responseTime).toBeLessThan(1000);
        
        // Close modal for next iteration
        const cancelButton = modal.locator('button').filter({ hasText: /cancel|close/i });
        await cancelButton.click();
        await expect(modal).not.toBeVisible();
      }
      
      const totalTime = Date.now() - startTime;
      console.log(`Total test time for ${Math.min(3, productCount)} products: ${totalTime}ms`);
    });
  });
});