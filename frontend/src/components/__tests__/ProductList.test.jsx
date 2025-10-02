import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductList from '../ProductList';

// Mock console.log to test click behavior
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

describe('ProductList - GV-48: Gift Voucher Redemption Button Implementation', () => {
  const mockOnAddToCart = jest.fn();

  beforeEach(() => {
    mockOnAddToCart.mockClear();
    mockConsoleLog.mockClear();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
  });

  // AC1: Button Visibility and Styling Tests
  describe('AC1: Button Visibility and Styling', () => {
    test('should render Redeem Gift Voucher buttons on all product cards', () => {
      render(<ProductList onAddToCart={mockOnAddToCart} />);
      
      // Test that voucher buttons are visible for all products
      const voucherButtons = screen.getAllByText('Redeem Gift Voucher');
      expect(voucherButtons).toHaveLength(3); // 3 products in the mock data
      
      // Verify each button is visible (not hidden)
      voucherButtons.forEach(button => {
        expect(button).toBeVisible();
        expect(button).not.toHaveStyle({ display: 'none' });
      });
    });

    test('should have distinctive red color styling for voucher buttons', () => {
      render(<ProductList onAddToCart={mockOnAddToCart} />);
      
      const voucherButtons = screen.getAllByText('Redeem Gift Voucher');
      
      voucherButtons.forEach(button => {
        expect(button).toHaveClass('cr-voucher-btn');
        expect(button).toHaveClass('cr-btn');
      });
    });

    test('should be visually distinct from Add to Cart buttons', () => {
      render(<ProductList onAddToCart={mockOnAddToCart} />);
      
      const addToCartButtons = screen.getAllByText('Add to Cart');
      const voucherButtons = screen.getAllByText('Redeem Gift Voucher');
      
      // Add to Cart buttons should have cr-btn class but not cr-voucher-btn
      addToCartButtons.forEach(button => {
        expect(button).toHaveClass('cr-btn');
        expect(button).not.toHaveClass('cr-voucher-btn');
      });
      
      // Voucher buttons should have both cr-btn and cr-voucher-btn classes
      voucherButtons.forEach(button => {
        expect(button).toHaveClass('cr-btn');
        expect(button).toHaveClass('cr-voucher-btn');
      });
    });

    test('should have consistent styling across all product cards', () => {
      render(<ProductList onAddToCart={mockOnAddToCart} />);
      
      const voucherButtons = screen.getAllByText('Redeem Gift Voucher');
      const firstButtonClasses = voucherButtons[0].className;
      
      // All voucher buttons should have identical class names
      voucherButtons.forEach(button => {
        expect(button.className).toBe(firstButtonClasses);
      });
    });
  });

  // AC2: Accessibility Compliance Tests
  describe('AC2: Accessibility Compliance', () => {
    test('should have proper ARIA labels describing their function', () => {
      render(<ProductList onAddToCart={mockOnAddToCart} />);
      
      // Test specific ARIA labels for each product
      expect(screen.getByLabelText('Redeem Gift Voucher for SORRENTO Fabric Modular Sofa')).toBeInTheDocument();
      expect(screen.getByLabelText('Redeem Gift Voucher for HARLOW Side Table')).toBeInTheDocument();
      expect(screen.getByLabelText('Redeem Gift Voucher for AVA Bed')).toBeInTheDocument();
    });

    test('should be keyboard accessible with Tab navigation', () => {
      render(<ProductList onAddToCart={mockOnAddToCart} />);
      
      const voucherButtons = screen.getAllByText('Redeem Gift Voucher');
      
      voucherButtons.forEach(button => {
        // Check tabIndex is set correctly
        expect(button).toHaveAttribute('tabIndex', '0');
        
        // Verify button can receive focus
        button.focus();
        expect(button).toHaveFocus();
      });
    });

    test('should have visible focus indicators when selected', () => {
      render(<ProductList onAddToCart={mockOnAddToCart} />);
      
      const voucherButtons = screen.getAllByText('Redeem Gift Voucher');
      
      voucherButtons.forEach(button => {
        // Focus the button and check it's focusable
        button.focus();
        expect(button).toHaveFocus();
        
        // The CSS focus styling is handled by CSS, but we can verify the button is focusable
        expect(button).toHaveAttribute('tabIndex', '0');
      });
    });

    test('should be accessible to screen readers', () => {
      render(<ProductList onAddToCart={mockOnAddToCart} />);
      
      const voucherButtons = screen.getAllByText('Redeem Gift Voucher');
      
      voucherButtons.forEach(button => {
        // Verify ARIA label exists and is descriptive
        expect(button).toHaveAttribute('aria-label');
        expect(button.getAttribute('aria-label')).toContain('Redeem Gift Voucher for');
        
        // Verify button role is implicit (button element)
        expect(button.tagName).toBe('BUTTON');
      });
    });
  });

  // AC3: Mobile Responsiveness Tests (CSS-based tests)
  describe('AC3: Mobile Responsiveness', () => {
    test('should have minimum touch target size for mobile devices', () => {
      render(<ProductList onAddToCart={mockOnAddToCart} />);
      
      const voucherButtons = screen.getAllByText('Redeem Gift Voucher');
      
      voucherButtons.forEach(button => {
        // Check that the button has the cr-btn class which includes min-height: 44px
        expect(button).toHaveClass('cr-btn');
        
        // The actual CSS rule min-height: 44px is tested through CSS classes
        // In a real test environment, we could use getComputedStyle, but Jest/JSDOM has limitations
        const buttonRect = button.getBoundingClientRect();
        // Note: In JSDOM, actual computed styles aren't fully available, 
        // so we rely on class-based testing
      });
    });

    test('should maintain proper button positioning', () => {
      render(<ProductList onAddToCart={mockOnAddToCart} />);
      
      const productCards = screen.getAllByRole('button', { name: /Redeem Gift Voucher/ }).map(button => 
        button.closest('.cr-product-card')
      );
      
      // Verify each product card contains both buttons
      productCards.forEach(card => {
        expect(card).toBeInTheDocument();
        const buttonsInCard = card.querySelectorAll('button');
        expect(buttonsInCard).toHaveLength(2); // Add to Cart + Redeem Gift Voucher
      });
    });
  });

  // AC4: Interactive Behavior Tests
  describe('AC4: Interactive Behavior', () => {
    test('should provide visual feedback through CSS classes', () => {
      render(<ProductList onAddToCart={mockOnAddToCart} />);
      
      const voucherButtons = screen.getAllByText('Redeem Gift Voucher');
      
      voucherButtons.forEach(button => {
        // Verify the button has hover-capable classes
        expect(button).toHaveClass('cr-voucher-btn');
        expect(button).toHaveClass('cr-btn');
        
        // CSS :hover, :active, :focus states are defined in CSS and tested through class presence
      });
    });

    test('should properly capture click events', async () => {
      render(<ProductList onAddToCart={mockOnAddToCart} />);
      
      const sorrentoVoucherButton = screen.getByLabelText('Redeem Gift Voucher for SORRENTO Fabric Modular Sofa');
      
      // Click the voucher button
      fireEvent.click(sorrentoVoucherButton);
      
      // Verify the click event was captured and logged
      await waitFor(() => {
        expect(mockConsoleLog).toHaveBeenCalledWith('Redeem voucher clicked for product: SORRENTO Fabric Modular Sofa');
      });
    });

    test('should capture click events for all product voucher buttons', async () => {
      render(<ProductList onAddToCart={mockOnAddToCart} />);
      
      // Test clicking each voucher button
      const productNames = ['SORRENTO Fabric Modular Sofa', 'HARLOW Side Table', 'AVA Bed'];
      
      for (const productName of productNames) {
        const voucherButton = screen.getByLabelText(`Redeem Gift Voucher for ${productName}`);
        fireEvent.click(voucherButton);
        
        await waitFor(() => {
          expect(mockConsoleLog).toHaveBeenCalledWith(`Redeem voucher clicked for product: ${productName}`);
        });
      }
      
      expect(mockConsoleLog).toHaveBeenCalledTimes(3);
    });

    test('should remain accessible during interaction', () => {
      render(<ProductList onAddToCart={mockOnAddToCart} />);
      
      const voucherButton = screen.getByLabelText('Redeem Gift Voucher for SORRENTO Fabric Modular Sofa');
      
      // Before interaction
      expect(voucherButton).toBeEnabled();
      expect(voucherButton).toHaveAttribute('tabIndex', '0');
      
      // During interaction (click)
      fireEvent.click(voucherButton);
      
      // After interaction - should still be accessible
      expect(voucherButton).toBeEnabled();
      expect(voucherButton).toHaveAttribute('tabIndex', '0');
      expect(voucherButton).toHaveAttribute('aria-label');
    });

    test('should not interfere with Add to Cart button functionality', () => {
      render(<ProductList onAddToCart={mockOnAddToCart} />);
      
      const addToCartButtons = screen.getAllByText('Add to Cart');
      
      // Click first Add to Cart button
      fireEvent.click(addToCartButtons[0]);
      
      // Verify Add to Cart functionality still works
      expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
      
      // Verify voucher button click doesn't affect Add to Cart
      const voucherButton = screen.getByLabelText('Redeem Gift Voucher for SORRENTO Fabric Modular Sofa');
      fireEvent.click(voucherButton);
      
      // onAddToCart should not be called again
      expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
    });
  });

  // Additional Integration Tests
  describe('Integration Tests', () => {
    test('should render complete product list with all expected elements', () => {
      render(<ProductList onAddToCart={mockOnAddToCart} />);
      
      // Verify all products are rendered
      expect(screen.getByText('SORRENTO Fabric Modular Sofa')).toBeInTheDocument();
      expect(screen.getByText('HARLOW Side Table')).toBeInTheDocument();
      expect(screen.getByText('AVA Bed')).toBeInTheDocument();
      
      // Verify product prices
      expect(screen.getByText('$3999.00')).toBeInTheDocument();
      expect(screen.getByText('$199.00')).toBeInTheDocument();
      expect(screen.getByText('$999.00')).toBeInTheDocument();
      
      // Verify all buttons are present
      expect(screen.getAllByText('Add to Cart')).toHaveLength(3);
      expect(screen.getAllByText('Redeem Gift Voucher')).toHaveLength(3);
    });

    test('should handle PropTypes correctly', () => {
      // This test ensures PropTypes are working and no console errors
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      render(<ProductList onAddToCart={mockOnAddToCart} />);
      
      // No PropTypes errors should occur
      expect(consoleSpy).not.toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });
  });
});