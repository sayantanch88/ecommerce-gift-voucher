import React, { useState } from 'react';
import VoucherModal from './VoucherModal';

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

function ProductList({ onAddToCart }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [discounts, setDiscounts] = useState({});

  function handleOpenModal(product) {
    setSelectedProduct(product);
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
    setSelectedProduct(null);
  }

  function handleRedeem(discountRate) {
    setDiscounts(prev => ({ ...prev, [selectedProduct.id]: discountRate }));
  }

  return (
    <>
      <div className="cr-product-list">
        {products.map(product => {
          const discount = discounts[product.id] || 0;
          const discountedPrice = product.price * (1 - discount);
          return (
            <div className="cr-product-card" key={product.id}>
              <img className="cr-product-img" src={product.image} alt={product.name} onError={e => {e.target.src='https://placehold.co/180x120?text=Image';}} />
              <div className="cr-product-name">{product.name}</div>
              <div className="cr-product-price">
                Price: <span style={discount ? {textDecoration:'line-through',color:'#888'} : {}}>${product.price.toFixed(2)}</span>
                {discount ? <span style={{color:'#008060',marginLeft:8}}>${discountedPrice.toFixed(2)} (-{Math.round(discount*100)}%)</span> : null}
              </div>
              <div className="cr-product-actions">
                <button className="cr-btn" onClick={onAddToCart}>Add to Cart</button>
                  {/* GV-6: Redeem Gift Voucher button, visible and accessible */}
                  <button
                    className="cr-btn cr-voucher-btn"
                    style={{background:'#ff4444'}}
                    aria-label={`Redeem Gift Voucher for ${product.name}`}
                    tabIndex={0}
                    onClick={() => handleOpenModal(product)}
                  >
                    Redeem Gift Voucher
                  </button>
              </div>
            </div>
          );
        })}
      </div>
      <VoucherModal
        open={modalOpen}
        onClose={handleCloseModal}
        onRedeem={handleRedeem}
        product={selectedProduct || {name:''}}
      />
    </>
  );
}


export default ProductList;
