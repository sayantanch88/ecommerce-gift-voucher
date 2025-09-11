import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductList from '../ProductList';

// Mock onAddToCart
const onAddToCart = jest.fn();

describe('GV-6: ProductList Redeem Gift Voucher Button', () => {
  it('renders Redeem Gift Voucher button for each product', () => {
    render(<ProductList onAddToCart={onAddToCart} />);
    const buttons = screen.getAllByRole('button', { name: /Redeem Gift Voucher/i });
    expect(buttons.length).toBe(3); // 3 products
  });

  it('Redeem Gift Voucher button is accessible via keyboard', () => {
    render(<ProductList onAddToCart={onAddToCart} />);
    const button = screen.getAllByRole('button', { name: /Redeem Gift Voucher/i })[0];
    button.focus();
    expect(document.activeElement).toBe(button);
  });

  it('Redeem Gift Voucher button opens modal for correct product', () => {
    render(<ProductList onAddToCart={onAddToCart} />);
    const buttons = screen.getAllByRole('button', { name: /Redeem Gift Voucher/i });
    fireEvent.click(buttons[1]);
    // Find the modal and check for Oslo Coffee Table inside the modal
    const modal = screen.getByRole('dialog', { hidden: true }) || document.querySelector('.cr-modal');
    expect(modal).toBeTruthy();
    // Check for Oslo Coffee Table in modal context
    expect(screen.getByText(/Enter your voucher code/i)).toBeInTheDocument();
    // Optionally, check for Oslo Coffee Table in a <b> tag inside modal
    const modalText = modal && modal.querySelector('b');
    expect(modalText && modalText.textContent).toMatch(/Oslo Coffee Table/);
  });

  it('Redeem Gift Voucher button remains visible after product list update', () => {
    render(<ProductList onAddToCart={onAddToCart} />);
    // Simulate discount applied
    const buttons = screen.getAllByRole('button', { name: /Redeem Gift Voucher/i });
    fireEvent.click(buttons[0]);
    fireEvent.click(screen.getByText('Cancel'));
    // Should still be visible
    expect(screen.getAllByRole('button', { name: /Redeem Gift Voucher/i }).length).toBe(3);
  });
});
