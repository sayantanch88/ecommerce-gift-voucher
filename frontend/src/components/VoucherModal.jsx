import React, { useState } from 'react';
import PropTypes from 'prop-types';

function VoucherModal({ open, onClose, onRedeem, product }) {
  const [voucher, setVoucher] = useState('');
  const [error, setError] = useState('');

  if (!open) return null;

  function handleRedeem() {
    // Simulate voucher validation
    if (voucher.trim().toUpperCase() === 'DEMO10') {
      onRedeem(0.1); // 10% discount
      setError('');
      onClose();
    } else {
      setError('Invalid voucher code. Try "DEMO10".');
    }
  }

  return (
    <div className="cr-modal-overlay">
      <div className="cr-modal" role="dialog" aria-modal="true" aria-label="Redeem Gift Voucher Modal">
        <h3>Redeem Gift Voucher</h3>
        <p>Enter your voucher code to get a discount on <b>{product?.name || 'this product'}</b>.</p>
        <input
          type="text"
          value={voucher}
          onChange={e => setVoucher(e.target.value)}
          placeholder="Voucher code"
          className="cr-modal-input"
        />
        {error && <div className="cr-modal-error">{error}</div>}
        <div className="cr-modal-actions">
          <button className="cr-btn" onClick={handleRedeem}>Redeem</button>
          <button className="cr-btn" style={{background:'#ccc',color:'#222'}} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

VoucherModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRedeem: PropTypes.func.isRequired,
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string
  })
};

export default VoucherModal;
