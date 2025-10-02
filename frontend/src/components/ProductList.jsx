import React, { useState } from 'react';
import PropTypes from 'prop-types';


const products = [
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

function ProductList({ onAddToCart, onOpenVoucherModal }) {

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
                onClick={() => onOpenVoucherModal(product)}
                aria-label={`Redeem Voucher for ${product.name}`}
                tabIndex={0}
              >
                Redeem Voucher
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

ProductList.propTypes = {
  onAddToCart: PropTypes.func.isRequired,
  onOpenVoucherModal: PropTypes.func.isRequired
};

export default ProductList;
