import React from 'react';
import { X, ShoppingBag, Star, Check, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../constants';
import { Link } from 'react-router-dom';
import { ShareButtons } from './ShareButtons';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  
  // Construct product URL for sharing from modal
  const productUrl = `${window.location.origin}/#/product/${product.id}`;

  // Close modal on escape key
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
        onClick={onClose}
      ></div>
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-200 grid md:grid-cols-2 max-h-[90vh] z-10 flex flex-col">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 dark:bg-black/50 rounded-full hover:bg-white dark:hover:bg-black text-slate-900 dark:text-white transition-colors shadow-sm"
        >
            <X size={20} />
        </button>

        <div className="bg-slate-100 dark:bg-slate-800 relative group h-64 md:h-auto overflow-hidden">
             <img 
               src={product.image} 
               alt={product.name} 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
             />
             {product.isNew && (
              <span className="absolute top-4 left-4 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                NEW
              </span>
            )}
        </div>

        <div className="p-6 md:p-10 flex flex-col overflow-y-auto custom-scrollbar">
            <div className="mb-2">
               <span className="inline-block py-1 px-2 rounded-lg bg-brand-50 dark:bg-slate-800 text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                 {product.category}
               </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3 leading-tight">{product.name}</h2>

            <div className="flex items-center space-x-2 mb-6">
                <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "" : "text-slate-300 dark:text-slate-700"} />
                    ))}
                </div>
                <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  {product.rating} ({product.reviews} reviews)
                </span>
            </div>

            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                {formatCurrency(product.price)}
            </div>

            <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed text-sm">
                {product.description}
            </p>

             <div className="mb-8 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-3">Key Highlights</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.specs.slice(0, 4).map((spec, i) => (
                        <li key={i} className="flex items-center text-xs text-slate-600 dark:text-slate-300">
                            <Check size={14} className="text-green-500 mr-2 flex-shrink-0" /> {spec}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-auto space-y-3">
                <button
                    onClick={() => {
                        addToCart(product);
                        onClose();
                    }}
                    className="w-full bg-slate-900 dark:bg-brand-600 text-white py-3.5 rounded-xl font-bold hover:bg-brand-600 dark:hover:bg-brand-700 transition-all shadow-lg shadow-slate-200 dark:shadow-none flex items-center justify-center group"
                >
                    <ShoppingBag size={18} className="mr-2 group-hover:animate-bounce" /> Add to Cart
                </button>
                <Link
                    to={`/product/${product.id}`}
                    className="w-full py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center"
                >
                    View Full Details <ArrowRight size={16} className="ml-2" />
                </Link>
                
                <ShareButtons productName={product.name} url={productUrl} />
            </div>
        </div>
      </div>
    </div>
  );
};