import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';

export default function App() {
  const [cartCount, setCartCount] = React.useState(0);
  const user = { name: 'Jane Doe', cartCount };

  function handleAddToCart() {
    setCartCount(c => c + 1);
  }

  return (
    <div className="cr-app">
      <Header user={user} />
      <main className="cr-main">
  <h2 className="cr-title">Furniture and Homewares</h2>
        <ProductList onAddToCart={handleAddToCart} />
      </main>
      <Footer />
    </div>
  );
}
