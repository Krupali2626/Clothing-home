import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/z_style.css';

import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import Home from './Container/Home';
import Shop from './Container/Shop';
import About from './Container/About';
import Contact from './Container/Contact';
import Cart from './Container/Cart';
import { CartProvider } from './Container/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="z_app_wrapper">
          <Navbar />
          <main className="z_main_content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
