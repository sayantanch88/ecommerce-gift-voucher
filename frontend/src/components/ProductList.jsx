import React, { useState } from 'react';


const products = [
  {
  id: 1,
  name: 'The Vittoria Sofa',
  price: 4420,
  image: '/images/Vittoria.jpg',
  },
  {
  id: 2,
  name: 'Oslo Coffee Table',
  price: 1420,
  image: '/images/Oslo.jpg',
  },
  {
  id: 3,
  name: 'Victor Swivel Chair',
  price: 1645,
  image: '/images/Victor.jpg',
  },
];

function ProductList({ onAddToCart, onRedeemVoucher }) {
  return (
    <>
      <div className="cr-product-list">
        {products.map(product => (
          <div className="cr-product-card" key={product.id}>
            <img className="cr-product-img" src={product.image} alt={product.name} onError={e => {e.target.src='https://placehold.co/180x120?text=Image';}} />
            <div className="cr-product-name">{product.name}</div>
            <div className="cr-product-price">
              Price: <span>${product.price.toFixed(2)}</span>
            </div>
            <div className="cr-product-actions">
              <button className="cr-btn" onClick={onAddToCart}>Add to Cart</button>
              <button
                className="cr-btn cr-voucher-btn"
                style={{ background: '#ff4444' }}
                aria-label={`Redeem Gift Voucher for ${product.name}`}
                tabIndex={0}
                onClick={() => onRedeemVoucher(product)}
              >
                Redeem Gift Voucher
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}


export default ProductList;
