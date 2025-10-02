import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import VoucherModal from '../VoucherModal';

describe('VoucherModal - GV-43 Integration Tests', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 99.99,
    image: '/images/test.jpg'
  };

  const mockOnClose = jest.fn();
  const mockOnRedeem = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Modal Display and Accessibility', () => {
    it('should not render when open is false', () => {
      render(
        <VoucherModal
          open={false}
          onClose={mockOnClose}
          onRedeem={mockOnRedeem}
          product={mockProduct}
        />
      );

      expect(screen.queryByText('Redeem Gift Voucher')).not.toBeInTheDocument();
    });

    it('should render with proper accessibility attributes when open', () => {
      render(
        <VoucherModal
          open={true}
          onClose={mockOnClose}
          onRedeem={mockOnRedeem}
          product={mockProduct}
        />
      );

      // Check modal is visible
      expect(screen.getByText('Redeem Gift Voucher')).toBeInTheDocument();

      // Check accessibility attributes
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveAttribute('aria-modal', 'true');
      expect(modal).toHaveAttribute('aria-label', 'Redeem Gift Voucher Modal');
    });

    it('should display product information correctly', () => {
      render(
        <VoucherModal
          open={true}
          onClose={mockOnClose}
          onRedeem={mockOnRedeem}
          product={mockProduct}
        />
      );

      // Check product name is displayed in the modal content
      expect(screen.getByText(/Test Product/)).toBeInTheDocument();
      expect(screen.getByText(/Enter your voucher code to get a discount on/)).toBeInTheDocument();
    });
  });

  describe('Voucher Input and Validation', () => {
    it('should allow user to enter voucher code', () => {
      render(
        <VoucherModal
          open={true}
          onClose={mockOnClose}
          onRedeem={mockOnRedeem}
          product={mockProduct}
        />
      );

      const input = screen.getByPlaceholderText('Voucher code');
      fireEvent.change(input, { target: { value: 'TEST123' } });

      expect(input).toHaveValue('TEST123');
    });

    it('should show error for invalid voucher code', () => {
      render(
        <VoucherModal
          open={true}
          onClose={mockOnClose}
          onRedeem={mockOnRedeem}
          product={mockProduct}
        />
      );

      const input = screen.getByPlaceholderText('Voucher code');
      const redeemButton = screen.getByRole('button', { name: 'Redeem' });

      fireEvent.change(input, { target: { value: 'INVALID' } });
      fireEvent.click(redeemButton);

      expect(screen.getByText('Invalid voucher code. Try "DEMO10".')).toBeInTheDocument();
      expect(mockOnRedeem).not.toHaveBeenCalled();
      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('should process valid voucher code successfully', () => {
      render(
        <VoucherModal
          open={true}
          onClose={mockOnClose}
          onRedeem={mockOnRedeem}
          product={mockProduct}
        />
      );

      const input = screen.getByPlaceholderText('Voucher code');
      const redeemButton = screen.getByRole('button', { name: 'Redeem' });

      fireEvent.change(input, { target: { value: 'DEMO10' } });
      fireEvent.click(redeemButton);

      expect(mockOnRedeem).toHaveBeenCalledWith(0.1); // 10% discount
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should handle case-insensitive voucher codes', () => {
      render(
        <VoucherModal
          open={true}
          onClose={mockOnClose}
          onRedeem={mockOnRedeem}
          product={mockProduct}
        />
      );

      const input = screen.getByPlaceholderText('Voucher code');
      const redeemButton = screen.getByRole('button', { name: 'Redeem' });

      fireEvent.change(input, { target: { value: 'demo10' } });
      fireEvent.click(redeemButton);

      expect(mockOnRedeem).toHaveBeenCalledWith(0.1);
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should handle voucher codes with extra whitespace', () => {
      render(
        <VoucherModal
          open={true}
          onClose={mockOnClose}
          onRedeem={mockOnRedeem}
          product={mockProduct}
        />
      );

      const input = screen.getByPlaceholderText('Voucher code');
      const redeemButton = screen.getByRole('button', { name: 'Redeem' });

      fireEvent.change(input, { target: { value: '  DEMO10  ' } });
      fireEvent.click(redeemButton);

      expect(mockOnRedeem).toHaveBeenCalledWith(0.1);
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  describe('Modal Actions', () => {
    it('should close modal when Cancel button is clicked', () => {
      render(
        <VoucherModal
          open={true}
          onClose={mockOnClose}
          onRedeem={mockOnRedeem}
          product={mockProduct}
        />
      );

      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);

      expect(mockOnClose).toHaveBeenCalled();
      expect(mockOnRedeem).not.toHaveBeenCalled();
    });

    it('should have proper button styling', () => {
      render(
        <VoucherModal
          open={true}
          onClose={mockOnClose}
          onRedeem={mockOnRedeem}
          product={mockProduct}
        />
      );

      const redeemButton = screen.getByRole('button', { name: 'Redeem' });
      const cancelButton = screen.getByRole('button', { name: 'Cancel' });

      expect(redeemButton).toHaveClass('cr-btn');
      expect(cancelButton).toHaveClass('cr-btn');
    });
  });

  describe('Error State Management', () => {
    it('should clear error when valid code is entered after invalid attempt', () => {
      render(
        <VoucherModal
          open={true}
          onClose={mockOnClose}
          onRedeem={mockOnRedeem}
          product={mockProduct}
        />
      );

      const input = screen.getByPlaceholderText('Voucher code');
      const redeemButton = screen.getByRole('button', { name: 'Redeem' });

      // First, enter invalid code
      fireEvent.change(input, { target: { value: 'INVALID' } });
      fireEvent.click(redeemButton);

      expect(screen.getByText('Invalid voucher code. Try "DEMO10".')).toBeInTheDocument();

      // Then enter valid code
      fireEvent.change(input, { target: { value: 'DEMO10' } });
      fireEvent.click(redeemButton);

      // Error should be cleared and redemption should succeed
      expect(screen.queryByText('Invalid voucher code. Try "DEMO10".')).not.toBeInTheDocument();
      expect(mockOnRedeem).toHaveBeenCalledWith(0.1);
    });
  });

  describe('PropTypes and Integration', () => {
    it('should handle null product gracefully', () => {
      render(
        <VoucherModal
          open={true}
          onClose={mockOnClose}
          onRedeem={mockOnRedeem}
          product={null}
        />
      );

      // Should still render modal but without product name
      expect(screen.getByText('Redeem Gift Voucher')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Voucher code')).toBeInTheDocument();
    });
  });
});