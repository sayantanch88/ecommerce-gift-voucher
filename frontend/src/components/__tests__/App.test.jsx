import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../App';

describe('App - GV-43 Voucher Modal Integration Tests', () => {
  describe('Modal State Management', () => {
    it('should initially render without voucher modal visible', () => {
      render(<App />);

      // Modal should not be visible initially
      expect(screen.queryByText('Redeem Gift Voucher')).not.toBeInTheDocument();
      expect(screen.queryByText('Enter your voucher code')).not.toBeInTheDocument();
    });

    it('should open voucher modal when Redeem Voucher button is clicked', async () => {
      render(<App />);

      // Click a Redeem Voucher button
      const redeemButton = screen.getByLabelText('Redeem Voucher for SORRENTO Fabric Modular Sofa');
      fireEvent.click(redeemButton);

      // Modal should now be visible
      await waitFor(() => {
        expect(screen.getByText('Redeem Gift Voucher')).toBeInTheDocument();
      });

      // Check that the correct product is referenced in the modal
      expect(screen.getByText('Redeem Gift Voucher')).toBeInTheDocument();
      expect(screen.getByText(/Enter your voucher code to get a discount on/)).toBeInTheDocument();
    });

    it('should close voucher modal when Cancel button is clicked', async () => {
      render(<App />);

      // Open modal
      const redeemButton = screen.getByLabelText('Redeem Voucher for HARLOW Side Table');
      fireEvent.click(redeemButton);

      await waitFor(() => {
        expect(screen.getByText('Redeem Gift Voucher')).toBeInTheDocument();
      });

      // Close modal
      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);

      await waitFor(() => {
        expect(screen.queryByText('Redeem Gift Voucher')).not.toBeInTheDocument();
      });
    });

    it('should close modal and reset when voucher is successfully redeemed', async () => {
      // Mock console.log to verify voucher redemption
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

      render(<App />);

      // Open modal
      const redeemButton = screen.getByLabelText('Redeem Voucher for AVA Bed');
      fireEvent.click(redeemButton);

      await waitFor(() => {
        expect(screen.getByText('Redeem Gift Voucher')).toBeInTheDocument();
      });

      // Enter valid voucher code
      const input = screen.getByPlaceholderText('Voucher code');
      fireEvent.change(input, { target: { value: 'DEMO10' } });

      // Submit voucher
      const redeemSubmitButton = screen.getByRole('button', { name: 'Redeem' });
      fireEvent.click(redeemSubmitButton);

      // Modal should close and console should log redemption
      await waitFor(() => {
        expect(screen.queryByText('Redeem Gift Voucher')).not.toBeInTheDocument();
      });

      expect(consoleSpy).toHaveBeenCalledWith('Voucher redeemed with 10% discount for AVA Bed');

      consoleSpy.mockRestore();
    });
  });

  describe('Product Selection Accuracy', () => {
    it('should pass correct product information to modal for each product', async () => {
      render(<App />);

      const products = [
        { name: 'SORRENTO Fabric Modular Sofa', label: 'Redeem Voucher for SORRENTO Fabric Modular Sofa' },
        { name: 'HARLOW Side Table', label: 'Redeem Voucher for HARLOW Side Table' },
        { name: 'AVA Bed', label: 'Redeem Voucher for AVA Bed' }
      ];

      for (const product of products) {
        // Click the specific product's voucher button
        const redeemButton = screen.getByLabelText(product.label);
        fireEvent.click(redeemButton);

        // Verify modal opens with correct product
        await waitFor(() => {
          expect(screen.getByText('Redeem Gift Voucher')).toBeInTheDocument();
          expect(screen.getByText(/Enter your voucher code to get a discount on/)).toBeInTheDocument();
        });

        // Close modal for next iteration
        const cancelButton = screen.getByText('Cancel');
        fireEvent.click(cancelButton);

        await waitFor(() => {
          expect(screen.queryByText('Redeem Gift Voucher')).not.toBeInTheDocument();
        });
      }
    });
  });

  describe('Component Integration', () => {
    it('should render all required components', () => {
      render(<App />);

      // Check main app components are rendered  
      expect(screen.getByText(/Welcome, Jane Doe/)).toBeInTheDocument(); // Header user
      expect(screen.getByText('Furniture and Homewares')).toBeInTheDocument(); // Main title
      expect(screen.getByText('SORRENTO Fabric Modular Sofa')).toBeInTheDocument(); // Product list
      
      // Check footer content
      expect(screen.getByText(/© 2025 Freedom/)).toBeInTheDocument();
    });

    it('should maintain Add to Cart functionality alongside voucher feature', () => {
      render(<App />);

      // Initial cart count should be 0
      expect(screen.getByText(/Cart \(0\)/)).toBeInTheDocument();

      // Click Add to Cart
      const addToCartButton = screen.getAllByText('Add to Cart')[0];
      fireEvent.click(addToCartButton);

      // Cart count should increase
      expect(screen.getByText(/Cart \(1\)/)).toBeInTheDocument();

      // Voucher functionality should still work
      const redeemButton = screen.getByLabelText('Redeem Voucher for SORRENTO Fabric Modular Sofa');
      fireEvent.click(redeemButton);

      expect(screen.getByText('Redeem Gift Voucher')).toBeInTheDocument();
    });
  });
});