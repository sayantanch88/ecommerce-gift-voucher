import React from 'react';

export default function Header({ user }) {
  return (
    <header className="cr-header">
      <div className="cr-header-logo">FREEDOM</div>
      <div className="cr-header-right">
        <span className="cr-header-cart">🛒 Cart ({user.cartCount})</span>
        <span className="cr-header-user">Welcome, {user.name}</span>
      </div>
    </header>
  );
}
