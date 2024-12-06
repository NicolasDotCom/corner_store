import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import CreateProduct from './pages/CreateProduct';
import Promotions from './pages/Promotions';
import Cart from './pages/Cart';
import EditProduct from './pages/EditProduct';

const App = () => {
  return (
    <Router>
      <div id="app">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/edit-product/:id" element={<EditProduct />} /> {/* Ruta para editar productos */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
