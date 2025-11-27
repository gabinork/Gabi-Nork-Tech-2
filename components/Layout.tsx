import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, Phone, MapPin, Mail, Facebook, Twitter, Instagram, Minus, Plus, Trash2, Sun, Moon, User as UserIcon, LogOut, Newspaper } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../constants';
import { ChatAssistant } from './ChatAssistant';

// Custom Logo Component to match the provided image
const Logo = () => (
  <div className="flex items-center gap-3">
    {/* Geometric Shield Logo - Recreated as SVG */}
    <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <defs>
        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d97706" /> {/* amber-600 */}
          <stop offset="50%" stopColor="#fbbf24" /> {/* amber-400 */}
          <stop offset="100%" stopColor="#b45309" /> {/* amber-700 */}
        </linearGradient>
      </defs>
      {/* Left part of shield (G shape abstract) */}
      <path d="M20 20 L50 20 L50 35 L35 35 L35 75 L50 85 L50 100 L20 85 Z" fill="url(#gold-gradient)" />
      {/* Right part of shield (N shape abstract) */}
      <path d="M55 20 L85 20 L85 65 L70 55 L70 35 L55 35 Z" fill="url(#gold-gradient)" />
      <path d="M85 75 L85 85 L55 100 L55 45 L70 55 L70 85 Z" fill="url(#gold-gradient)" />
    </svg>
    
    <div className="flex flex-col justify-center">
      <h1 className="text-2xl md:text-3xl font-black uppercase leading-none tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600">
        Gabi Nork
      </h1>
      <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-amber-500 w-full text-center">
        Tech
      </span>
    </div>
  </div>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity, totalAmount, itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Cart animation state
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const prevItemCount = useRef(itemCount);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (itemCount > prevItemCount.current) {
      setIsCartAnimating(true);
      const timer = setTimeout(() => setIsCartAnimating(false), 300);
      return () => clearTimeout(timer);
    }
    prevItemCount.current = itemCount;
  }, [itemCount]);

  // Click outside listener for user menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'News', path: '/blog' },
    { name: 'Track Order', path: '/track' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Top Bar */}
      <div className="bg-slate-900 dark:bg-slate-950 text-slate-400 text-xs py-2 px-4 hidden md:block border-b border-slate-800">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-6">
            <span className="flex items-center hover:text-white cursor-pointer"><Phone size={12} className="mr-1"/> 07030337982</span>
            <span className="flex items-center hover:text-white cursor-pointer"><Mail size={12} className="mr-1"/> gabinorktech@gmail.com</span>
          </div>
          <div className="flex space-x-4">
            <Link to="/news" className="hover:text-amber-500 transition-colors">Latest Tech News</Link>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group hover:opacity-90 transition-opacity">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors ${location.pathname === link.path ? 'text-amber-600 dark:text-amber-500' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleTheme}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-600 dark:text-slate-300"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-600 dark:text-slate-300 hidden sm:block">
              <Search size={20} />
            </button>
            
            <button 
              onClick={toggleCart}
              className={`p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all duration-300 text-slate-600 dark:text-slate-300 relative ${isCartAnimating ? 'scale-125 text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-slate-800' : ''}`}
            >
              <ShoppingBag size={20} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Auth Menu / User Profile - TOP RIGHT CORNER */}
            <div className="relative hidden md:block" ref={userMenuRef}>
              {isAuthenticated && user ? (
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 pl-2 pr-1 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                >
                  <div className="text-right hidden lg:block">
                    <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">Hi, {user.name.split(' ')[0]}</p>
                    <p className="text-[10px] text-brand-600 dark:text-brand-400 font-medium">Member</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-700 flex items-center justify-center text-brand-600 dark:text-brand-400 overflow-hidden">
                    {user.avatar ? <img src={user.avatar} alt="User" className="w-full h-full object-cover" /> : <UserIcon size={16} />}
                  </div>
                </button>
              ) : (
                <div className="flex items-center space-x-2 ml-2">
                   <Link to="/login" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Login</Link>
                   <span className="text-slate-300 dark:text-slate-700">|</span>
                   <Link to="/register" className="text-sm font-semibold text-brand-600 dark:text-brand-500 hover:text-brand-700 transition-colors">Register</Link>
                </div>
              )}

              {/* Dropdown Menu */}
              {isUserMenuOpen && isAuthenticated && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-in slide-in-from-top-2 z-50">
                  <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                    <p className="font-bold text-slate-900 dark:text-white truncate">{user?.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                  </div>
                  <div className="p-1">
                    <Link to="/profile" className="flex items-center w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                      <UserIcon size={16} className="mr-2" /> My Profile
                    </Link>
                    <Link to="/track" className="flex items-center w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                      <ShoppingBag size={16} className="mr-2" /> My Orders
                    </Link>
                    <button 
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                    >
                      <LogOut size={16} className="mr-2" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button 
              className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-600 dark:text-slate-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-4 animate-in slide-in-from-top-5">
          
          {/* Mobile User Profile */}
          {isAuthenticated && user ? (
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 font-bold overflow-hidden">
                 {user.avatar ? <img src={user.avatar} alt="User" className="w-full h-full object-cover" /> : user.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-900 dark:text-white">{user.name}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
            </div>
          ) : (
             <div className="flex space-x-4 pb-4 border-b border-slate-100 dark:border-slate-800">
               <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex-1 py-2 text-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-sm">Login</Link>
               <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="flex-1 py-2 text-center rounded-lg bg-brand-600 text-white font-medium text-sm">Register</Link>
             </div>
          )}

          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-slate-700 dark:text-slate-200 font-medium py-2 border-b border-slate-50 dark:border-slate-800 last:border-0"
            >
              {link.name}
            </Link>
          ))}

          {isAuthenticated && (
            <button 
              onClick={() => {
                logout();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left text-red-600 font-medium py-2 flex items-center"
            >
              <LogOut size={16} className="mr-2" /> Logout
            </button>
          )}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Chat Assistant */}
      <ChatAssistant />

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white pt-16 pb-8 border-t border-slate-800">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
               {/* Simplified Footer Logo */}
               <div className="flex flex-col">
                  <h2 className="text-xl font-black uppercase leading-none tracking-wide text-amber-500">Gabi Nork</h2>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-600">Tech</span>
               </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your number one destination for premium tech gadgets in Nigeria. Quality products, verified warranties, and swift delivery nationwide.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-lg text-white">Shop</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link to="/shop" className="hover:text-amber-500 transition-colors">All Products</Link></li>
              <li><Link to="/shop?cat=Laptops" className="hover:text-amber-500 transition-colors">Laptops</Link></li>
              <li><Link to="/shop?cat=Phones" className="hover:text-amber-500 transition-colors">Phones</Link></li>
              <li><Link to="/shop?cat=Accessories" className="hover:text-amber-500 transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-lg text-white">Support</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link to="/contact" className="hover:text-amber-500 transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-amber-500 transition-colors">FAQs</Link></li>
              <li><Link to="/blog" className="hover:text-amber-500 transition-colors">News & Insights</Link></li>
              <li><Link to="/returns" className="hover:text-amber-500 transition-colors">Returns & Warranty</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-lg text-white">Contact</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex items-start space-x-2"><MapPin size={16} className="text-amber-500 mt-0.5 flex-shrink-0" /> <span>House No. 18 Ezekwe Street, Flat 6, Kado</span></li>
              <li className="flex items-center space-x-2"><Phone size={16} className="text-amber-500 flex-shrink-0" /> <span>07030337982</span></li>
              <li className="flex items-center space-x-2"><Mail size={16} className="text-amber-500 flex-shrink-0" /> <span>gabinorktech@gmail.com</span></li>
            </ul>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-amber-600 transition-colors"><Facebook size={18} /></a>
              <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-amber-600 transition-colors"><Twitter size={18} /></a>
              <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-amber-600 transition-colors"><Instagram size={18} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} GabNork Tech. All rights reserved.
        </div>
      </footer>

      {/* Cart Drawer (Slide Over) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={toggleCart}></div>
          
          {/* Drawer */}
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl h-full flex flex-col animate-in slide-in-from-right duration-300 border-l border-slate-200 dark:border-slate-800">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
              <h2 className="font-bold text-lg flex items-center text-slate-900 dark:text-white">
                <ShoppingBag className="mr-2 text-amber-600" /> Your Cart ({cart.length})
              </h2>
              <button onClick={toggleCart} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-600 dark:text-slate-400">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-500 space-y-4">
                  <ShoppingBag size={64} strokeWidth={1} />
                  <p>Your cart is empty.</p>
                  <Link 
                    to="/shop" 
                    onClick={toggleCart}
                    className="bg-slate-900 dark:bg-slate-700 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-amber-600 dark:hover:bg-amber-600 transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex space-x-4">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-lg flex-shrink-0 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-2">{item.name}</h4>
                      <p className="text-amber-600 font-bold text-sm mt-1">{formatCurrency(item.price)}</p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 text-sm font-medium text-slate-900 dark:text-white">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-600 p-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 space-y-4">
                <div className="flex justify-between items-center text-lg font-bold text-slate-900 dark:text-white">
                  <span>Total</span>
                  <span>{formatCurrency(totalAmount)}</span>
                </div>
                <Link 
                  to="/checkout"
                  onClick={toggleCart}
                  className="block w-full bg-slate-900 dark:bg-brand-600 text-white text-center py-4 rounded-xl font-bold hover:bg-brand-600 dark:hover:bg-brand-700 transition-colors shadow-lg shadow-slate-200 dark:shadow-none"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};