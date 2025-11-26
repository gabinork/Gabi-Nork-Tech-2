import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ShieldCheck, Truck, CreditCard, Clock, Cpu, Wifi, Battery, Smartphone, Laptop } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../constants';
import { Category } from '../types';

const categoryImages: Record<string, string> = {
  [Category.Laptops]: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&w=600&q=80',
  [Category.Phones]: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
  [Category.Smartwatches]: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
  [Category.Audio]: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80',
  [Category.Accessories]: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80',
};

export const Home = () => {
  const featuredProducts = PRODUCTS.filter(p => p.isNew || p.rating > 4.7).slice(0, 4);
  
  // Animation State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Interactive Hero Section */}
      <section 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative bg-slate-950 overflow-hidden min-h-[600px] flex items-center group"
      >
        {/* 1. Technical Grid Background */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        ></div>

        {/* 2. Mouse Follower Spotlight */}
        <div 
          className="absolute pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(14, 165, 233, 0.15), transparent 40%)`,
            inset: 0,
            zIndex: 1
          }}
        />

        {/* 3. Ambient Glows */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-brand-600/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[100px] animate-pulse delay-700"></div>

        {/* 4. Parallax Floating Tech Elements (Decorations) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
           {/* Chip */}
           <div 
             className="absolute top-[15%] right-[15%] text-slate-700 opacity-20 transition-transform duration-100 ease-out hidden md:block"
             style={{ transform: `translate(${mousePos.x * -0.02}px, ${mousePos.y * -0.02}px) rotate(12deg)` }}
           >
             <Cpu size={120} strokeWidth={1} />
           </div>
           {/* Wifi */}
           <div 
             className="absolute bottom-[20%] right-[30%] text-brand-900 opacity-30 transition-transform duration-100 ease-out hidden md:block"
             style={{ transform: `translate(${mousePos.x * -0.04}px, ${mousePos.y * -0.04}px) rotate(-12deg)` }}
           >
             <Wifi size={80} strokeWidth={1} />
           </div>
           {/* Battery */}
           <div 
             className="absolute top-[40%] left-[10%] text-amber-900 opacity-20 transition-transform duration-100 ease-out hidden md:block"
             style={{ transform: `translate(${mousePos.x * 0.03}px, ${mousePos.y * 0.03}px) rotate(45deg)` }}
           >
             <Battery size={60} strokeWidth={1} />
           </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 py-24 md:py-32">
          <div className="flex flex-col md:flex-row items-center justify-between">
            
            {/* Text Content */}
            <div className="max-w-2xl space-y-8 animate-in slide-in-from-left duration-700 fade-in relative z-20">
              <div className="inline-flex items-center space-x-2 bg-slate-800/50 border border-slate-700/50 rounded-full px-4 py-1.5 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                </span>
                <span className="text-slate-300 text-xs font-medium uppercase tracking-wider">
                  Future Tech Arriving Daily
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1]">
                Tech That <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-sky-300 to-amber-200 animate-gradient-x">
                  Moves You.
                </span>
              </h1>
              
              <p className="text-lg text-slate-400 leading-relaxed max-w-lg border-l-2 border-slate-700 pl-6">
                Upgrade your lifestyle with the latest gadgets. From high-performance laptops to smart wearables, GabNork brings you premium tech at the best prices in Nigeria.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link 
                  to="/shop" 
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-brand-600 text-white font-bold rounded-xl overflow-hidden shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40 transition-all"
                >
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                  <span className="relative flex items-center">Shop Now <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} /></span>
                </Link>
                <Link 
                  to="/shop?cat=Laptops" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 hover:border-slate-600 transition-all"
                >
                  <Laptop className="mr-2 text-slate-400" size={20} /> View Laptops
                </Link>
              </div>
            </div>

            {/* Hero Image / 3D Composition */}
            <div className="hidden lg:block relative w-[450px] h-[450px] animate-in zoom-in duration-1000 delay-200">
               {/* Central Floating Element */}
               <div 
                 className="absolute inset-0 bg-gradient-to-tr from-slate-800 to-slate-900 rounded-3xl border border-slate-700 shadow-2xl flex items-center justify-center rotate-3 hover:rotate-0 transition-all duration-500 z-20"
                 style={{ transform: `perspective(1000px) rotateY(${mousePos.x * 0.01}deg) rotateX(${mousePos.y * -0.01}deg)` }}
               >
                  <img 
                    src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600" 
                    alt="Hero Tech" 
                    className="w-[90%] h-[90%] object-cover rounded-2xl opacity-80 hover:opacity-100 transition-opacity"
                  />
                  {/* Floating Badge */}
                  <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 animate-bounce">
                     <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full text-green-600">
                        <ShieldCheck size={24} />
                     </div>
                     <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">Warranty</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">1 Year Verified</p>
                     </div>
                  </div>
               </div>

               {/* Background Decorative Squares */}
               <div className="absolute inset-0 bg-brand-600 rounded-3xl -rotate-6 opacity-20 scale-95 z-10 animate-pulse"></div>
               <div className="absolute inset-0 bg-amber-500 rounded-3xl rotate-6 opacity-10 scale-90 z-0"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: <Truck size={32} />, title: 'Nationwide Delivery', desc: 'Fast shipping across Nigeria' },
            { icon: <ShieldCheck size={32} />, title: '1 Year Warranty', desc: 'On all gadgets sold' },
            { icon: <CreditCard size={32} />, title: 'Easy Payments', desc: 'Installments & Pay on Delivery' },
            { icon: <Clock size={32} />, title: '24/7 Support', desc: 'Expert technical assistance' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 hover:transform hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-14 h-14 bg-brand-50 dark:bg-slate-700 group-hover:bg-brand-600 group-hover:text-white text-brand-600 dark:text-brand-400 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">{item.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Browse Categories</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Find exactly what you need</p>
          </div>
          <Link to="/shop" className="text-brand-600 dark:text-brand-400 font-semibold hover:text-brand-700 flex items-center">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.values(Category).map((cat) => (
            <Link 
              key={cat} 
              to={`/shop?cat=${cat}`}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              <img 
                src={categoryImages[cat]} 
                alt={cat}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              
              <div className="absolute bottom-0 left-0 p-4 w-full">
                <div className="w-8 h-1 bg-brand-500 mb-2 rounded-full w-0 group-hover:w-8 transition-all duration-300"></div>
                <h3 className="text-white font-bold text-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{cat}</h3>
                <p className="text-slate-300 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">Explore Collection</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Trending Now</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promo Section */}
      <section className="container mx-auto px-4">
        <div className="bg-slate-900 dark:bg-slate-800 rounded-3xl p-8 md:p-16 relative overflow-hidden flex items-center group">
          <div className="relative z-10 max-w-lg">
            <span className="text-brand-400 font-bold tracking-wider text-sm uppercase">Limited Time Offer</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">Get 10% Off on Apple Products</h2>
            <p className="text-slate-300 mb-8 text-lg">Use code <span className="text-white font-mono bg-white/10 px-2 py-1 rounded border border-white/10">GABNORK10</span> at checkout. Valid for purchases over ₦500,000.</p>
            <Link to="/shop" className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors inline-block">
              Start Shopping
            </Link>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-brand-900/20 to-transparent hidden md:block"></div>
           {/* Abstract Interactive Shapes */}
           <div className="absolute top-1/2 right-10 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
           <div className="absolute bottom-[-50px] left-[20%] w-40 h-40 bg-amber-500/10 rounded-full blur-2xl animate-pulse"></div>
        </div>
      </section>
    </div>
  );
};
