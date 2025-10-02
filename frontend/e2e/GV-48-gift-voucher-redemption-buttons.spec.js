// GV-48-gift-voucher-redemption-buttons.spec.js
// Playwright UI automation tests for Gift Voucher Redemption Button Implementation
// Jira Story: GV-48 - Frontend: Implement Gift Voucher Redemption Button on Product Cards
// Epic: GV-1 - Implement Gift Voucher Redemption

const { test, expect } = require('@playwright/test');

test.describe('GV-48: Gift Voucher Redemption Button Implementation', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the application before each test
    await page.goto('/');
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
    
    // Wait for product cards to be visible
    await expect(page.locator('.cr-product-card')).toHaveCount(3);
  });

  test.describe('AC1: Button Visibility and Styling', () => {
    
    test('GV-48-AC1-001: Should display Redeem Gift Voucher buttons on all product cards', async ({ page }) => {
      // GIVEN: User is viewing the product listing page
      // WHEN: The page loads
      
      // THEN: "Redeem Gift Voucher" buttons should be visible on all product cards
      const voucherButtons = page.locator('button:has-text("Redeem Gift Voucher")');
      await expect(voucherButtons).toHaveCount(3);
      
      // Verify each button is visible (not hidden)
      for (let i = 0; i < 3; i++) {
        await expect(voucherButtons.nth(i)).toBeVisible();
        
        // Ensure buttons don't have display:none styling
        const isVisible = await voucherButtons.nth(i).isVisible();
        expect(isVisible).toBe(true);
      }
      
      // Verify buttons are present for each product
      const productNames = ['SORRENTO Fabric Modular Sofa', 'HARLOW Side Table', 'AVA Bed'];
      for (const productName of productNames) {
        const productCard = page.locator('.cr-product-card', { hasText: productName });
        const voucherButton = productCard.locator('button:has-text("Redeem Gift Voucher")');
        await expect(voucherButton).toBeVisible();
      }
    });

    test('GV-48-AC1-002: Should have distinctive red color styling for voucher buttons', async ({ page }) => {
      // GIVEN: Voucher buttons are visible
      const voucherButtons = page.locator('button:has-text("Redeem Gift Voucher")');
      
      // WHEN: Inspecting button styling
      // THEN: Buttons should have distinctive red/accent color styling
      for (let i = 0; i < 3; i++) {
        const button = voucherButtons.nth(i);
        
        // Verify CSS classes are applied
        await expect(button).toHaveClass(/cr-voucher-btn/);
        await expect(button).toHaveClass(/cr-btn/);
        
        // Verify computed background color (red)
        const backgroundColor = await button.evaluate(el => 
          window.getComputedStyle(el).backgroundColor
        );
        
        // Should be red color (#e63946 = rgb(230, 57, 70))
        expect(backgroundColor).toMatch(/rgb\\(230,\\s*57,\\s*70\\)|rgb\\(230, 57, 70\\)/);
      }
    });

    test('GV-48-AC1-003: Should be visually distinct from Add to Cart buttons', async ({ page }) => {
      // GIVEN: Both button types are visible
      const addToCartButtons = page.locator('button:has-text("Add to Cart")');
      const voucherButtons = page.locator('button:has-text("Redeem Gift Voucher")');
      
      // WHEN: Comparing button styling
      // THEN: Buttons should be visually distinct
      
      // Add to Cart buttons should have green background
      const addToCartColor = await addToCartButtons.first().evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      
      // Voucher buttons should have red background
      const voucherColor = await voucherButtons.first().evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      
      // Colors should be different
      expect(addToCartColor).not.toBe(voucherColor);
      
      // Verify green for Add to Cart (#008060 = rgb(0, 128, 96))
      expect(addToCartColor).toMatch(/rgb\\(0,\\s*128,\\s*96\\)|rgb\\(0, 128, 96\\)/);
      
      // Verify red for voucher buttons (#e63946 = rgb(230, 57, 70))
      expect(voucherColor).toMatch(/rgb\\(230,\\s*57,\\s*70\\)|rgb\\(230, 57, 70\\)/);
    });

    test('GV-48-AC1-004: Should have consistent styling across all product cards', async ({ page }) => {
      // GIVEN: Multiple product cards with voucher buttons
      const voucherButtons = page.locator('button:has-text("Redeem Gift Voucher")');
      
      // WHEN: Inspecting styling consistency
      // THEN: Styling should be consistent across all product cards
      
      // Get styling from first button as reference
      const firstButtonClasses = await voucherButtons.first().getAttribute('class');
      const firstButtonColor = await voucherButtons.first().evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      
      // Compare with all other buttons
      const buttonCount = await voucherButtons.count();
      for (let i = 1; i < buttonCount; i++) {
        const buttonClasses = await voucherButtons.nth(i).getAttribute('class');
        const buttonColor = await voucherButtons.nth(i).evaluate(el => 
          window.getComputedStyle(el).backgroundColor
        );
        
        // Classes should be identical
        expect(buttonClasses).toBe(firstButtonClasses);
        
        // Colors should be identical
        expect(buttonColor).toBe(firstButtonColor);
      }
    });
  });

  test.describe('AC2: Accessibility Compliance', () => {
    
    test('GV-48-AC2-001: Should have proper ARIA labels for screen readers', async ({ page }) => {
      // GIVEN: User with assistive technology
      // WHEN: Navigating the product listing page
      // THEN: Voucher buttons should have proper ARIA labels
      
      const expectedAriaLabels = [
        'Redeem Gift Voucher for SORRENTO Fabric Modular Sofa',
        'Redeem Gift Voucher for HARLOW Side Table',
        'Redeem Gift Voucher for AVA Bed'
      ];
      
      for (const expectedLabel of expectedAriaLabels) {
        const button = page.locator(`button[aria-label="${expectedLabel}"]`);
        await expect(button).toBeVisible();
        
        // Verify ARIA label attribute exists and is correct
        const actualLabel = await button.getAttribute('aria-label');
        expect(actualLabel).toBe(expectedLabel);
      }
    });

    test('GV-48-AC2-002: Should be keyboard accessible with Tab navigation', async ({ page }) => {
      // GIVEN: User using keyboard navigation
      // WHEN: Navigating with Tab key
      // THEN: Voucher buttons should be accessible via Tab navigation
      
      // Start tabbing from the beginning
      await page.keyboard.press('Tab');
      
      const voucherButtons = page.locator('button:has-text("Redeem Gift Voucher")');
      
      // Verify each voucher button has proper tabIndex
      for (let i = 0; i < 3; i++) {
        const button = voucherButtons.nth(i);
        const tabIndex = await button.getAttribute('tabIndex');
        expect(tabIndex).toBe('0');
        
        // Verify button can receive focus
        await button.focus();
        await expect(button).toBeFocused();
      }
    });

    test('GV-48-AC2-003: Should have visible focus indicators when selected', async ({ page }) => {
      // GIVEN: User navigating with keyboard
      // WHEN: Focusing on voucher buttons
      // THEN: Focus indicators should be visible
      
      const voucherButtons = page.locator('button:has-text("Redeem Gift Voucher")');
      
      for (let i = 0; i < 3; i++) {
        const button = voucherButtons.nth(i);
        
        // Focus the button
        await button.focus();
        await expect(button).toBeFocused();
        
        // Verify focus styling is applied
        const outline = await button.evaluate(el => 
          window.getComputedStyle(el).outline
        );
        
        // Should have visible outline (2px solid with color)
        expect(outline).toMatch(/2px|solid/);
      }
    });

    test('GV-48-AC2-004: Should support keyboard activation with Enter and Space', async ({ page }) => {
      // GIVEN: User using keyboard navigation
      // WHEN: Pressing Enter or Space on focused voucher button
      // THEN: Button should be activated
      
      // Set up console message listener
      const consoleMessages = [];
      page.on('console', (msg) => {
        if (msg.type() === 'log') {
          consoleMessages.push(msg.text());
        }
      });
      
      const firstVoucherButton = page.locator('button:has-text("Redeem Gift Voucher")').first();
      
      // Test Enter key activation
      await firstVoucherButton.focus();
      await page.keyboard.press('Enter');
      
      // Verify console log was triggered
      await page.waitForTimeout(100); // Brief wait for console log
      expect(consoleMessages.some(msg => 
        msg.includes('Redeem voucher clicked for product: SORRENTO Fabric Modular Sofa')
      )).toBe(true);
      
      // Test Space key activation
      const secondVoucherButton = page.locator('button:has-text("Redeem Gift Voucher")').nth(1);
      await secondVoucherButton.focus();
      await page.keyboard.press('Space');
      
      // Verify console log was triggered
      await page.waitForTimeout(100);
      expect(consoleMessages.some(msg => 
        msg.includes('Redeem voucher clicked for product: HARLOW Side Table')
      )).toBe(true);
    });
  });

  test.describe('AC3: Mobile Responsiveness', () => {
    
    test('GV-48-AC3-001: Should have touch-friendly buttons on mobile (minimum 44px)', async ({ page }) => {
      // GIVEN: User on a mobile device
      // Simulate mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      // WHEN: Viewing the product listing page
      // THEN: Voucher buttons should be touch-friendly (minimum 44px)
      
      const voucherButtons = page.locator('button:has-text("Redeem Gift Voucher")');
      
      for (let i = 0; i < 3; i++) {
        const button = voucherButtons.nth(i);
        const buttonBox = await button.boundingBox();
        
        // Verify minimum touch target size (48px on mobile as per implementation)
        expect(buttonBox.height).toBeGreaterThanOrEqual(44);
        expect(buttonBox.width).toBeGreaterThanOrEqual(100); // Reasonable width for text
      }
    });

    test('GV-48-AC3-002: Should remain properly positioned on different screen sizes', async ({ page }) => {
      // Test different viewport sizes
      const viewports = [
        { width: 320, height: 568 }, // iPhone SE
        { width: 375, height: 667 }, // iPhone 8
        { width: 768, height: 1024 }, // iPad
        { width: 1024, height: 768 }, // Desktop small
      ];
      
      for (const viewport of viewports) {
        await page.setViewportSize(viewport);
        await page.reload();
        await page.waitForLoadState('networkidle');
        
        // THEN: Buttons should remain properly positioned and sized
        const voucherButtons = page.locator('button:has-text("Redeem Gift Voucher")');
        await expect(voucherButtons).toHaveCount(3);
        
        // Verify all buttons are visible and clickable
        for (let i = 0; i < 3; i++) {
          await expect(voucherButtons.nth(i)).toBeVisible();
          
          // Verify button is within viewport
          const buttonBox = await voucherButtons.nth(i).boundingBox();
          expect(buttonBox.x).toBeGreaterThanOrEqual(0);
          expect(buttonBox.y).toBeGreaterThanOrEqual(0);
          expect(buttonBox.x + buttonBox.width).toBeLessThanOrEqual(viewport.width);
        }
      }
    });

    test('GV-48-AC3-003: Should not overlap with other interactive elements', async ({ page }) => {
      // Test on mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      // GIVEN: User on mobile device
      // WHEN: Viewing product cards
      // THEN: Touch targets should not overlap
      
      const productCards = page.locator('.cr-product-card');
      
      for (let i = 0; i < 3; i++) {
        const card = productCards.nth(i);
        const addToCartBtn = card.locator('button:has-text("Add to Cart")');
        const voucherBtn = card.locator('button:has-text("Redeem Gift Voucher")');
        
        const addToCartBox = await addToCartBtn.boundingBox();
        const voucherBox = await voucherBtn.boundingBox();
        
        // Verify buttons don't overlap
        const verticalGap = Math.abs(addToCartBox.y + addToCartBox.height - voucherBox.y);
        expect(verticalGap).toBeGreaterThanOrEqual(8); // Minimum 8px gap
        
        // Verify horizontal alignment (buttons should be stacked vertically)
        expect(Math.abs(addToCartBox.x - voucherBox.x)).toBeLessThanOrEqual(5); // Allow small variance
      }
    });
  });

  test.describe('AC4: Interactive Behavior', () => {
    
    test('GV-48-AC4-001: Should provide visual feedback on hover state', async ({ page }) => {
      // GIVEN: User interacting with voucher button
      // WHEN: Hovering over button
      // THEN: Visual feedback should be provided
      
      const voucherButton = page.locator('button:has-text("Redeem Gift Voucher")').first();
      
      // Get initial background color
      const initialColor = await voucherButton.evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      
      // Hover over button
      await voucherButton.hover();
      
      // Get hover background color
      const hoverColor = await voucherButton.evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      
      // Colors should be different (hover should be darker red)
      expect(hoverColor).not.toBe(initialColor);
      
      // Hover should be darker red (#d62828 = rgb(214, 40, 40))
      expect(hoverColor).toMatch(/rgb\\(214,\\s*40,\\s*40\\)|rgb\\(214, 40, 40\\)/);
    });

    test('GV-48-AC4-002: Should capture click events properly', async ({ page }) => {
      // GIVEN: User clicking voucher button
      // Set up console message listener
      const consoleMessages = [];
      page.on('console', (msg) => {
        if (msg.type() === 'log') {
          consoleMessages.push(msg.text());
        }
      });
      
      // WHEN: Clicking the button
      const voucherButton = page.locator('button:has-text("Redeem Gift Voucher")').first();
      await voucherButton.click();
      
      // THEN: Click event should be properly captured
      await page.waitForTimeout(100); // Brief wait for console log
      
      expect(consoleMessages.some(msg => 
        msg.includes('Redeem voucher clicked for product: SORRENTO Fabric Modular Sofa')
      )).toBe(true);
    });

    test('GV-48-AC4-003: Should capture click events for all product voucher buttons', async ({ page }) => {
      // Set up console message listener
      const consoleMessages = [];
      page.on('console', (msg) => {
        if (msg.type() === 'log') {
          consoleMessages.push(msg.text());
        }
      });
      
      // Test clicking each voucher button
      const expectedMessages = [
        'Redeem voucher clicked for product: SORRENTO Fabric Modular Sofa',
        'Redeem voucher clicked for product: HARLOW Side Table',
        'Redeem voucher clicked for product: AVA Bed'
      ];
      
      const voucherButtons = page.locator('button:has-text("Redeem Gift Voucher")');
      
      for (let i = 0; i < 3; i++) {
        await voucherButtons.nth(i).click();
        await page.waitForTimeout(100);
      }
      
      // Verify all expected messages were logged
      for (const expectedMessage of expectedMessages) {
        expect(consoleMessages.some(msg => msg.includes(expectedMessage))).toBe(true);
      }
    });

    test('GV-48-AC4-004: Should remain accessible during interaction', async ({ page }) => {
      // GIVEN: User interacting with voucher button
      const voucherButton = page.locator('button:has-text("Redeem Gift Voucher")').first();
      
      // WHEN: Before, during, and after interaction
      
      // Before interaction - verify accessibility
      await expect(voucherButton).toBeEnabled();
      const initialAriaLabel = await voucherButton.getAttribute('aria-label');
      expect(initialAriaLabel).toContain('Redeem Gift Voucher for');
      
      // During interaction (click)
      await voucherButton.click();
      
      // After interaction - verify accessibility maintained
      await expect(voucherButton).toBeEnabled();
      const finalAriaLabel = await voucherButton.getAttribute('aria-label');
      expect(finalAriaLabel).toBe(initialAriaLabel);
      
      // Verify button can still be focused and interacted with
      await voucherButton.focus();
      await expect(voucherButton).toBeFocused();
    });

    test('GV-48-AC4-005: Should not interfere with Add to Cart functionality', async ({ page }) => {
      // GIVEN: Both button types are present
      const addToCartButton = page.locator('button:has-text("Add to Cart")').first();
      const voucherButton = page.locator('button:has-text("Redeem Gift Voucher")').first();
      
      // Monitor cart count changes
      const initialCartCount = await page.locator('.cr-header-cart').textContent();
      
      // WHEN: Clicking Add to Cart button
      await addToCartButton.click();
      await page.waitForTimeout(100);
      
      // THEN: Cart functionality should work
      const updatedCartCount = await page.locator('.cr-header-cart').textContent();
      expect(updatedCartCount).not.toBe(initialCartCount);
      
      // WHEN: Clicking voucher button
      const consoleMessages = [];
      page.on('console', (msg) => {
        if (msg.type() === 'log') {
          consoleMessages.push(msg.text());
        }
      });
      
      await voucherButton.click();
      await page.waitForTimeout(100);
      
      // THEN: Voucher functionality should work without affecting cart
      expect(consoleMessages.some(msg => 
        msg.includes('Redeem voucher clicked for product:')
      )).toBe(true);
      
      // Cart count should remain unchanged by voucher click
      const finalCartCount = await page.locator('.cr-header-cart').textContent();
      expect(finalCartCount).toBe(updatedCartCount);
    });
  });

  test.describe('Integration and Cross-functional Tests', () => {
    
    test('GV-48-INT-001: Should render complete product list with all expected elements', async ({ page }) => {
      // GIVEN: Product listing page loaded
      // WHEN: Examining complete page structure
      // THEN: All elements should be present and functional
      
      // Verify product names
      await expect(page.locator('text=SORRENTO Fabric Modular Sofa')).toBeVisible();
      await expect(page.locator('text=HARLOW Side Table')).toBeVisible();
      await expect(page.locator('text=AVA Bed')).toBeVisible();
      
      // Verify product prices
      await expect(page.locator('text=$3999.00')).toBeVisible();
      await expect(page.locator('text=$199.00')).toBeVisible();
      await expect(page.locator('text=$999.00')).toBeVisible();
      
      // Verify all buttons are present
      await expect(page.locator('button:has-text("Add to Cart")')).toHaveCount(3);
      await expect(page.locator('button:has-text("Redeem Gift Voucher")')).toHaveCount(3);
      
      // Verify product images
      const productImages = page.locator('.cr-product-img');
      await expect(productImages).toHaveCount(3);
      
      for (let i = 0; i < 3; i++) {
        await expect(productImages.nth(i)).toBeVisible();
      }
    });

    test('GV-48-INT-002: Should handle rapid successive clicks gracefully', async ({ page }) => {
      // Set up console message listener
      const consoleMessages = [];
      page.on('console', (msg) => {
        if (msg.type() === 'log') {
          consoleMessages.push(msg.text());
        }
      });
      
      const voucherButton = page.locator('button:has-text("Redeem Gift Voucher")').first();
      
      // Rapid click test
      for (let i = 0; i < 5; i++) {
        await voucherButton.click();
      }
      
      await page.waitForTimeout(200);
      
      // Should have 5 console messages
      const voucherMessages = consoleMessages.filter(msg => 
        msg.includes('Redeem voucher clicked for product: SORRENTO')
      );
      expect(voucherMessages).toHaveLength(5);
      
      // Button should remain responsive
      await expect(voucherButton).toBeEnabled();
      await expect(voucherButton).toBeVisible();
    });

    test('GV-48-PERF-001: Should maintain performance with voucher button interactions', async ({ page }) => {
      // Measure performance
      const startTime = Date.now();
      
      // Perform various interactions
      const voucherButtons = page.locator('button:has-text("Redeem Gift Voucher")');
      
      // Click all voucher buttons
      for (let i = 0; i < 3; i++) {
        await voucherButtons.nth(i).click();
        await page.waitForTimeout(10); // Small delay between clicks
      }
      
      // Test hover interactions
      for (let i = 0; i < 3; i++) {
        await voucherButtons.nth(i).hover();
        await page.waitForTimeout(10);
      }
      
      const endTime = Date.now();
      const totalTime = endTime - startTime;
      
      // Interactions should complete within reasonable time (1 second)
      expect(totalTime).toBeLessThan(1000);
      
      // Page should remain responsive
      await expect(page.locator('h2:has-text("Furniture and Homewares")')).toBeVisible();
    });
  });

  test.describe('Error Handling and Edge Cases', () => {
    
    test('GV-48-EDGE-001: Should handle missing product data gracefully', async ({ page }) => {
      // This is a defensive test - buttons should render even if some product data is missing
      
      // Navigate and verify basic structure exists
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Even if some product data is missing, buttons should be present
      const voucherButtons = page.locator('button:has-text("Redeem Gift Voucher")');
      const buttonCount = await voucherButtons.count();
      
      // Should have at least some buttons
      expect(buttonCount).toBeGreaterThan(0);
      
      // Each visible button should be functional
      for (let i = 0; i < buttonCount; i++) {
        await expect(voucherButtons.nth(i)).toBeVisible();
        await expect(voucherButtons.nth(i)).toBeEnabled();
      }
    });

    test('GV-48-EDGE-002: Should handle window resize gracefully', async ({ page }) => {
      // Start with desktop size
      await page.setViewportSize({ width: 1200, height: 800 });
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      // Verify buttons are visible
      let voucherButtons = page.locator('button:has-text("Redeem Gift Voucher")');
      await expect(voucherButtons).toHaveCount(3);
      
      // Resize to mobile
      await page.setViewportSize({ width: 320, height: 568 });
      await page.waitForTimeout(500); // Allow time for responsive layout
      
      // Buttons should still be visible and functional
      voucherButtons = page.locator('button:has-text("Redeem Gift Voucher")');
      await expect(voucherButtons).toHaveCount(3);
      
      for (let i = 0; i < 3; i++) {
        await expect(voucherButtons.nth(i)).toBeVisible();
        
        // Verify touch target size on mobile
        const buttonBox = await voucherButtons.nth(i).boundingBox();
        expect(buttonBox.height).toBeGreaterThanOrEqual(44);
      }
      
      // Resize back to desktop
      await page.setViewportSize({ width: 1200, height: 800 });
      await page.waitForTimeout(500);
      
      // Should still be functional
      voucherButtons = page.locator('button:has-text("Redeem Gift Voucher")');
      await expect(voucherButtons).toHaveCount(3);
    });
  });
});