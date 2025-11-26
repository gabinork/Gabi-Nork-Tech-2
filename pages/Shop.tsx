import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, ChevronDown, ChevronUp, Check, X, Search } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, formatCurrency } from '../constants';
import { Category } from '../types';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Derived state from URL
  const selectedCategories = useMemo(() => {
    const param = searchParams.get('cat');
    if (!param) return [];
    return param.split(',').filter(Boolean);
  }, [searchParams]);

  const urlSearchQuery = searchParams.get('q') || '';

  const [priceRange, setPriceRange] = useState<number>(3000000);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  
  // Search State
  const [inputValue, setInputValue] = useState(urlSearchQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Sync input with URL changes (e.g. back button)
  useEffect(() => {
    setInputValue(urlSearchQuery);
  }, [urlSearchQuery]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const catMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const priceMatch = product.price <= priceRange;
      
      const query = urlSearchQuery.toLowerCase();
      const searchMatch = !query || 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      return catMatch && priceMatch && searchMatch;
    });
  }, [selectedCategories, priceRange, urlSearchQuery]);

  // Real-time suggestions based on local input
  const suggestions = useMemo(() => {
    if (!inputValue || inputValue.length < 1) return [];
    const query = inputValue.toLowerCase();
    return PRODUCTS.filter(p => p.name.toLowerCase().includes(query)).slice(0, 5);
  }, [inputValue]);

  const categories = Object.values(Category);

  const toggleCategory = (cat: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      const current = newParams.get('cat')?.split(',').filter(Boolean) || [];
      
      let updated;
      if (current.includes(cat)) {
        updated = current.filter(c => c !== cat);
      } else {
        updated = [...current, cat];
      }

      if (updated.length > 0) {
        newParams.set('cat', updated.join(','));
      } else {
        newParams.delete('cat');
      }
      return newParams;
    });
  };

  const executeSearch = (term: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (term.trim()) {
        newParams.set('q', term.trim());
      } else {
        newParams.delete('q');
      }
      return newParams;
    });
    setShowSuggestions(false);
  };

  const clearFilters = () => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.delete('cat');
      newParams.delete('q');
      return newParams;
    });
    setPriceRange(3000000);
    setInputValue('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-6 flex-shrink-0">
          
          {/* Categories Section */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <button 
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center">
                <Filter size={18} className="mr-2 text-brand-600" /> Categories
              </h3>
              {isCategoryOpen ? <ChevronUp size={16} className="text-slate-500"/> : <ChevronDown size={16} className="text-slate-500"/>}
            </button>
            
            <div className={`transition-all duration-300 ease-in-out ${isCategoryOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-4 space-y-3">
                {categories.map(cat => {
                  const isSelected = selectedCategories.includes(cat);
                  return (
                    <label 
                      key={cat}
                      className="flex items-center cursor-pointer group select-none"
                    >
                      <div className="relative flex items-center justify-center">
                        <input 
                          type="checkbox" 
                          className="peer appearance-none w-5 h-5 border-2 border-slate-300 dark:border-slate-600 rounded-md checked:bg-brand-600 checked:border-brand-600 transition-all bg-white dark:bg-slate-800"
                          checked={isSelected}
                          onChange={() => toggleCategory(cat)}
                        />
                        <Check size={12} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" strokeWidth={3} />
                      </div>
                      <span className={`ml-3 text-sm transition-colors ${isSelected ? 'text-slate-900 dark:text-white font-semibold' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'}`}>
                        {cat}
                      </span>
                    </label>
                  );
                })}
                
                {selectedCategories.length > 0 && (
                   <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-2">
                     <button 
                       onClick={() => setSearchParams(prev => { const p = new URLSearchParams(prev); p.delete('cat'); return p; })}
                       className="text-xs text-red-500 hover:text-red-600 font-medium flex items-center"
                     >
                       <X size={12} className="mr-1" /> Clear Categories
                     </button>
                   </div>
                )}
              </div>
            </div>
          </div>

          {/* Price Range Section */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <button 
              onClick={() => setIsPriceOpen(!isPriceOpen)}
              className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center">
                <SlidersHorizontal size={18} className="mr-2 text-brand-600" /> Price Range
              </h3>
              {isPriceOpen ? <ChevronUp size={16} className="text-slate-500"/> : <ChevronDown size={16} className="text-slate-500"/>}
            </button>
            
            <div className={`transition-all duration-300 ease-in-out ${isPriceOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-4">
                 <input 
                  type="range" 
                  min="0" 
                  max="3000000" 
                  step="50000" 
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-3 font-medium">
                  <span>₦0</span>
                  <span>₦{priceRange.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          
          {/* Search Bar */}
          <div className="relative mb-6 z-30" ref={searchRef}>
            <div className="relative group">
              <input 
                type="text" 
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all shadow-sm group-hover:shadow-md"
                placeholder="Search laptops, phones, accessories..."
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    executeSearch(inputValue);
                  }
                }}
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                 <Search size={20} />
              </div>
              {inputValue && (
                <button 
                  onClick={() => {
                    setInputValue('');
                    executeSearch('');
                  }}
                  className="absolute right-16 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X size={16} />
                </button>
              )}
              <button 
                onClick={() => executeSearch(inputValue)}
                className="absolute right-2 top-2 bottom-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-brand-600 hover:text-white dark:hover:bg-brand-600 dark:hover:text-white px-4 rounded-xl transition-all font-medium text-sm"
              >
                Search
              </button>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-in slide-in-from-top-2">
                <div className="p-2">
                   <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                     Suggestions
                   </div>
                   {suggestions.map((product) => (
                     <button
                       key={product.id}
                       onClick={() => {
                         setInputValue(product.name);
                         executeSearch(product.name);
                       }}
                       className="w-full flex items-center p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors text-left group"
                     >
                       <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0 border border-slate-200 dark:border-slate-700">
                         <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                       </div>
                       <div className="ml-3 flex-1 min-w-0">
                         <h4 className="text-sm font-medium text-slate-900 dark:text-white truncate group-hover:text-brand-600 dark:group-hover:text-brand-400">{product.name}</h4>
                         <p className="text-xs text-slate-500 dark:text-slate-400">{formatCurrency(product.price)}</p>
                       </div>
                     </button>
                   ))}
                </div>
              </div>
            )}
          </div>

          {/* Results Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                {selectedCategories.length === 0 && !urlSearchQuery ? 'All Products' : 'Filtered Results'}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
            </div>
            
            {(selectedCategories.length > 0 || priceRange < 3000000 || urlSearchQuery) && (
              <button 
                onClick={clearFilters}
                className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-lg transition-colors"
              >
                <X size={14} className="mr-1" /> Clear All Filters
              </button>
            )}
          </div>

          {/* Active Filters Tags */}
          {(selectedCategories.length > 0 || urlSearchQuery) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {urlSearchQuery && (
                 <button 
                  onClick={() => executeSearch('')}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-slate-900 dark:bg-slate-700 text-white text-xs font-medium shadow-sm hover:bg-slate-800 transition-all"
                >
                  Search: "{urlSearchQuery}" <X size={12} className="ml-1.5" />
                </button>
              )}
              {selectedCategories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-brand-600 text-white text-xs font-medium shadow-sm hover:bg-brand-700 transition-all"
                >
                  {cat} <X size={12} className="ml-1.5" />
                </button>
              ))}
            </div>
          )}

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 border-dashed">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <Search className="text-slate-400" size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">No products found</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-1 text-center max-w-xs">
                We couldn't find any products matching your current filters.
              </p>
              <button 
                onClick={clearFilters}
                className="mt-6 bg-slate-900 dark:bg-slate-700 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-brand-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};