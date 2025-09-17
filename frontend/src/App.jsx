import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import VoucherModal from './components/VoucherModal';

export default function App() {
  const [cartCount, setCartCount] = React.useState(0);
  const [voucherModalOpen, setVoucherModalOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const user = { name: 'Jane Doe', cartCount };

  function handleAddToCart() {
    setCartCount(c => c + 1);
  }

  function handleRedeemVoucher(product) {
    setSelectedProduct(product);
    setVoucherModalOpen(true);
  }

  function handleCloseVoucherModal() {
    setVoucherModalOpen(false);
    setSelectedProduct(null);
  }

  function handleVoucherRedeem(discount) {
    // Placeholder: In a real app, update product price or cart with discount
    // For now, just close modal
    setVoucherModalOpen(false);
    setSelectedProduct(null);
  }

  return (
    <div className="cr-app">
      <Header user={user} />
      <main className="cr-main">
        <h2 className="cr-title">Furniture and Homewares</h2>
        <ProductList onAddToCart={handleAddToCart} onRedeemVoucher={handleRedeemVoucher} />
      </main>
      <VoucherModal
        open={voucherModalOpen}
        onClose={handleCloseVoucherModal}
        onRedeem={handleVoucherRedeem}
        product={selectedProduct || { name: '' }}
      />
      <Footer />
    </div>
  );
}
