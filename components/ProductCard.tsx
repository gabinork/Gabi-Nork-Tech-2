import React, { useState } from 'react';
import { ShoppingBag, Star, Eye, Crown } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency } from '../constants';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { QuickViewModal } from './QuickViewModal';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, cart } = useCart();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const quantityInCart = cart.find(item => item.id === product.id)?.quantity || 0;

  return (
    <>
      <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
        <Link to={`/product/${product.id}`} className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
          <div className={`absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse transition-opacity duration-500 ${isImageLoaded ? 'opacity-0' : 'opacity-100'}`} />
          <img 
            src={product.image} 
            alt={product.name} 
            loading="lazy"
            decoding="async"
            onLoad={() => setIsImageLoaded(true)}
            className={`w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">
              NEW
            </span>
          )}
          
          {/* Quick View Overlay Button (Desktop) */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsQuickViewOpen(true);
              }}
              className="bg-white text-slate-900 px-4 py-2 rounded-full font-semibold text-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-brand-600 hover:text-white flex items-center hidden md:flex"
            >
              <Eye size={16} className="mr-2" /> Quick View
            </button>
          </div>
        </Link>
        
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center space-x-1 text-amber-400 mb-2 text-sm">
            <Star size={16} fill="currentColor" />
            <span className="text-slate-500 dark:text-slate-400 text-xs font-medium pt-0.5">{product.rating} ({product.reviews})</span>
          </div>
          
          <Link to={`/product/${product.id}`}>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 flex-1">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 font-medium">Price</span>
              <div className="flex items-center gap-x-2">
                <span className="text-lg font-bold text-slate-900 dark:text-white">{formatCurrency(product.price)}</span>
                {product.price > 500000 && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                    <Crown size={10} className="mr-0.5" /> PREMIUM
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setIsQuickViewOpen(true);
                }}
                className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 p-3 rounded-xl transition-colors md:hidden"
                aria-label="Quick view"
              >
                <Eye size={20} />
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product);
                }}
                className={`relative p-3 rounded-xl transition-all shadow-lg shadow-slate-200 dark:shadow-none ${
                  quantityInCart > 0 
                  ? 'bg-brand-600 text-white ring-2 ring-brand-200 dark:ring-brand-900' 
                  : 'bg-slate-900 dark:bg-slate-700 hover:bg-brand-600 dark:hover:bg-brand-600 text-white'
                }`}
                aria-label={