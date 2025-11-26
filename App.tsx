import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Checkout } from './pages/Checkout';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { About } from './pages/About';
import { AdminLogin } from './pages/AdminLogin';

// Placeholder pages
const Placeholder = ({ title }: { title: string }) => (
  <div className="container mx-auto px-4 py-20 text-center">
    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{title}</h1>
    <p className="text-slate-500 dark:text-slate-400">This page is under construction for the demo.</p>
  </div>
);

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <CartProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/checkout" element={<Checkout />} />
              
              {/* Integrated Pages */}
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              
              {/* Placeholders for other requested pages */}
              <Route path="/track" element={<Placeholder title="Track Your Order" />} />
              <Route path="/shipping" element={<Placeholder title="Shipping Policy" />} />
              <Route path="/returns" element={<Placeholder title="Returns & Warranty" />} />
            </Routes>
          </Layout>
        </CartProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;