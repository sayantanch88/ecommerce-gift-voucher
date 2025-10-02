import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import VoucherModal from './components/VoucherModal';

export default function App() {
  const [cartCount, setCartCount] = React.useState(0);
  const [isVoucherModalOpen, setIsVoucherModalOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const user = { name: 'Jane Doe', cartCount };

  function handleAddToCart() {
    setCartCount(c => c + 1);
  }

  function handleOpenVoucherModal(product) {
    setSelectedProduct(product);
    setIsVoucherModalOpen(true);
  }

  function handleCloseVoucherModal() {
    setIsVoucherModalOpen(false);
    setSelectedProduct(null);
  }

  function handleVoucherRedeem(discount) {
    // Handle voucher redemption logic here
    console.log(`Voucher redeemed with ${discount * 100}% discount for ${selectedProduct?.name}`);
  }

  return (
    <div className="cr-app">
      <Header user={user} />
      <main className="cr-main">
  <h2 className="cr-title">Furniture and Homewares</h2>
        <ProductList 
          onAddToCart={handleAddToCart} 
          onOpenVoucherModal={handleOpenVoucherModal}
        />
      </main>
      <Footer />
      <VoucherModal 
        open={isVoucherModalOpen}
        onClose={handleCloseVoucherModal}
        onRedeem={handleVoucherRedeem}
        product={selectedProduct}
      />
    </div>
  );
}
