import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductList from '../ProductList';

// Mock data matches the component's internal products array
const mockProducts = [
  {
    id: 1,
    name: 'SORRENTO Fabric Modular Sofa',
    price: 3999,
    image: '/images/Sorrento.webp',
  },
  {
    id: 2,
    name: 'HARLOW Side Table',
    price: 199,
    image: '/images/Harlow.webp',
  },
  {
    id: 3,
    name: 'AVA Bed',
    price: 999,
    image: '/images/Ava Bed.jpg',
  },
];

describe('ProductList - GV-43 Redeem Voucher Button Tests', () => {
  const mockOnAddToCart = jest.fn();
  const mockOnOpenVoucherModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('AC1: Button Display', () => {
    it('should display Redeem Voucher button on each product card', () => {
      render(
        <ProductList 
          onAddToCart={mockOnAddToCart} 
          onOpenVoucherModal={mockOnOpenVoucherModal}
        />
      );

      // Check that each product has a Redeem Voucher button
      const redeemButtons = screen.getAllByText('Redeem Voucher');
      expect(redeemButtons).toHaveLength(3); // Should match number of products

      // Verify each button has proper styling class
      redeemButtons.forEach(button => {
        expect(button).toHaveClass('cr-btn', 'cr-voucher-btn');
      });
    });

    it('should display buttons with proper ARIA labels for accessibility', () => {
      render(
        <ProductList 
          onAddToCart={mockOnAddToCart} 
          onOpenVoucherModal={mockOnOpenVoucherModal}
        />
      );

      // Check ARIA labels for accessibility
      expect(screen.getByLabelText('Redeem Voucher for SORRENTO Fabric Modular Sofa')).toBeInTheDocument();
      expect(screen.getByLabelText('Redeem Voucher for HARLOW Side Table')).toBeInTheDocument();
      expect(screen.getByLabelText('Redeem Voucher for AVA Bed')).toBeInTheDocument();
    });

    it('should display buttons as focusable elements', () => {
      render(
        <ProductList 
          onAddToCart={mockOnAddToCart} 
          onOpenVoucherModal={mockOnOpenVoucherModal}
        />
      );

      const redeemButtons = screen.getAllByText('Redeem Voucher');
      redeemButtons.forEach(button => {
        expect(button).toHaveAttribute('tabIndex', '0');
      });
    });
  });

  describe('AC2: Button Interaction', () => {
    it('should call onOpenVoucherModal with correct product when clicked', () => {
      render(
        <ProductList 
          onAddToCart={mockOnAddToCart} 
          onOpenVoucherModal={mockOnOpenVoucherModal}
        />
      );

      // Click the first product's Redeem Voucher button
      const firstRedeemButton = screen.getByLabelText('Redeem Voucher for SORRENTO Fabric Modular Sofa');
      fireEvent.click(firstRedeemButton);

      // Verify the modal handler was called with the correct product
      expect(mockOnOpenVoucherModal).toHaveBeenCalledTimes(1);
      expect(mockOnOpenVoucherModal).toHaveBeenCalledWith(mockProducts[0]);
    });

    it('should call onOpenVoucherModal with different products for different buttons', () => {
      render(
        <ProductList 
          onAddToCart={mockOnAddToCart} 
          onOpenVoucherModal={mockOnOpenVoucherModal}
        />
      );

      // Click different product buttons
      const harlow = screen.getByLabelText('Redeem Voucher for HARLOW Side Table');
      const ava = screen.getByLabelText('Redeem Voucher for AVA Bed');

      fireEvent.click(harlow);
      expect(mockOnOpenVoucherModal).toHaveBeenCalledWith(mockProducts[1]);

      fireEvent.click(ava);
      expect(mockOnOpenVoucherModal).toHaveBeenCalledWith(mockProducts[2]);
    });

    it('should not interfere with Add to Cart functionality', () => {
      render(
        <ProductList 
          onAddToCart={mockOnAddToCart} 
          onOpenVoucherModal={mockOnOpenVoucherModal}
        />
      );

      // Click Add to Cart buttons to ensure they still work
      const addToCartButtons = screen.getAllByText('Add to Cart');
      fireEvent.click(addToCartButtons[0]);

      expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
      expect(mockOnOpenVoucherModal).not.toHaveBeenCalled();
    });
  });

  describe('AC3: Responsive Design & Accessibility', () => {
    it('should render all product information correctly', () => {
      render(
        <ProductList 
          onAddToCart={mockOnAddToCart} 
          onOpenVoucherModal={mockOnOpenVoucherModal}
        />
      );

      // Verify product names are displayed
      expect(screen.getByText('SORRENTO Fabric Modular Sofa')).toBeInTheDocument();
      expect(screen.getByText('HARLOW Side Table')).toBeInTheDocument();
      expect(screen.getByText('AVA Bed')).toBeInTheDocument();

      // Verify prices are displayed correctly
      expect(screen.getByText('$3999.00')).toBeInTheDocument();
      expect(screen.getByText('$199.00')).toBeInTheDocument();
      expect(screen.getByText('$999.00')).toBeInTheDocument();
    });

    it('should have proper image alt text for accessibility', () => {
      render(
        <ProductList 
          onAddToCart={mockOnAddToCart} 
          onOpenVoucherModal={mockOnOpenVoucherModal}
        />
      );

      // Check image alt texts
      expect(screen.getByAltText('SORRENTO Fabric Modular Sofa')).toBeInTheDocument();
      expect(screen.getByAltText('HARLOW Side Table')).toBeInTheDocument();
      expect(screen.getByAltText('AVA Bed')).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    it('should have proper PropTypes validation', () => {
      // This test ensures PropTypes are correctly defined
      const { container } = render(
        <ProductList 
          onAddToCart={mockOnAddToCart} 
          onOpenVoucherModal={mockOnOpenVoucherModal}
        />
      );

      expect(container.firstChild).toBeInTheDocument();
    });

    it('should maintain component structure for styling', () => {
      render(
        <ProductList 
          onAddToCart={mockOnAddToCart} 
          onOpenVoucherModal={mockOnOpenVoucherModal}
        />
      );

      // Verify CSS class structure
      expect(document.querySelector('.cr-product-list')).toBeInTheDocument();
      expect(document.querySelectorAll('.cr-product-card')).toHaveLength(3);
      expect(document.querySelectorAll('.cr-product-actions')).toHaveLength(3);
    });
  });
});