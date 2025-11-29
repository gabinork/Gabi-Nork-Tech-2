import React, { Suspense, lazy, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home'; // Static import for Landing Page to ensure instant load

// Lazy Load other pages to improve bundle splitting
const Shop = lazy(() => import('./pages/Shop').then(module => ({ default: module.Shop })));
const ProductDetails = lazy(() => import('./pages/ProductDetails').then(module => ({ default: module.ProductDetails })));
const Checkout = lazy(() => import('./pages/Checkout').then(module => ({ default: module.Checkout })));
const FAQ = lazy(() => import('./pages/FAQ').then(module => ({ default: module.FAQ })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const Register = lazy(() => import('./pages/Register').then(module => ({ default: module.Register })));
const Login = lazy(() => import('./pages/Login').then(module => ({ default: module.Login })));
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const AdminLogin = lazy(() => import('./pages/AdminLogin').then(module => ({ default: module.AdminLogin })));
const Blog = lazy(() => import('./pages/Blog').then(module => ({ default: module.Blog })));
const TrackOrder = lazy(() => import('./pages/TrackOrder').then(module => ({ default: module.TrackOrder })));

// Minimal loading spinner for route transitions
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-brand-500/20 border-t-brand-500 rounded-full animate-spin"></div>
  </div>
);

// Placeholder pages for lazy loaded routes that don't exist yet
const Placeholder = ({ title }: { title: string }) => (
  <div className="container mx-auto px-4 py-20 text-center">
    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{title}</h1>
    <p className="text-slate-500 dark:text-slate-400">This page is under construction for the demo.</p>
  </div>
);

const App: React.FC = () => {
  // Handle Initial Loader Dismissal
  useEffect(() => {
    const loader = document.getElementById('initial-loader');
    if (loader) {
      // Use requestAnimationFrame to ensure the browser has painted the App component
      requestAnimationFrame(() => {
        // A slight buffer to ensure the Home page hero image has started processing/rendering
        setTimeout(() => {
          loader.style.opacity = '0';
          loader.style.pointerEvents = 'none';
          
          // Remove from DOM after CSS transition (0.5s)
          setTimeout(() => {
            if (loader.parentNode) {
              loader.parentNode.removeChild(loader);
            }
          }, 500);
        }, 100); 
      });
    }
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <CartProvider>
            <Layout>
              <Suspense fallback={<PageLoader />}>
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
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/news" element={<Blog />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/track" element={<TrackOrder />} />
                  
                  {/* Placeholders for other requested pages */}
                  <Route path="/shipping" element={<Placeholder title="Shipping Policy" />} />
                  <Route path="/returns" element={<Placeholder title="Returns & Warranty" />} />
                  <Route path="/profile" element={<Placeholder title="My Profile" />} />
                </Routes>
              </Suspense>
            </Layout>
          </CartProvider>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;