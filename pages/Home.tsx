import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ShieldCheck, Truck, CreditCard, Clock, Cpu, Wifi, Battery, Smartphone, Laptop, Zap } from 'lucide-react';
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
    <div className="space-y-16 pb-16 bg-[#020617]">
      {/* Interactive Hero Section with Tech Grid */}
      <section 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative bg-[#020617] overflow-hidden min-h-[650px] flex items-center group"
      >
        {/* 1. Technical Grid Background (matches reference image) */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #64748b 1px, transparent 1px), linear-gradient(to bottom, #64748b 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        ></div>

        {/* 2. Mouse Follower Spotlight (Gold tint) */}
        <div 
          className="absolute pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.08), transparent 40%)`,
            inset: 0,
            zIndex: 1
          }}
        />

        {/* 3. Ambient Glows - Deep and Dark */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[100px] animate-pulse delay-700"></div>

        {/* 4. Parallax Floating Tech Elements (Decorations) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
           {/* Chip */}
           <div 
             className="absolute top-[15%] right-[15%] text-slate-800 opacity-40 transition-transform duration-100 ease-out hidden md:block"
             style={{ transform: `translate(${mousePos.x * -0.02}px, ${mousePos.y * -0.02}px) rotate(12deg)` }}
           >
             <Cpu size={140} strokeWidth={0.5} />
           </div>
           {/* Wifi */}
           <div 
             className="absolute bottom-[20%] right-[30%] text-brand-900/20 opacity-30 transition-transform duration-100 ease-out hidden md:block"
             style={{ transform: `translate(${mousePos.x * -0.04}px, ${mousePos.y * -0.04}px) rotate(-12deg)` }}
           >
             <Wifi size={100} strokeWidth={0.5} />
           </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 py-24 md:py-32">
          <div className="flex flex-col md:flex-row items-center justify-between">
            
            {/* Text Content */}
            <div className="max-w-2xl space-y-8 animate-in slide-in-from-left duration-700 fade-in relative z-20">
              <div className="inline-flex items-center space-x-2 bg-slate-900/80 border border-slate-800 rounded-full px-4 py-1.5 backdrop-blur-md shadow-lg shadow-black/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                </span>
                <span className="text-brand-400 text-xs font-bold uppercase tracking-widest font-mono">
                  System Online
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                Tech That <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-amber-200 to-brand-500 animate-gradient-x">
                  Moves You.
                </span>
              </h1>
              
              <p className="text-lg text-slate-400 leading-relaxed max-w-lg border-l border-brand-500/30 pl-6">
                Upgrade your lifestyle with the latest gadgets. From high-performance laptops to smart wearables, GabNork brings you premium tech at the best prices in Nigeria.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link 
                  to="/shop" 
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-brand-500 text-slate-950 font-bold rounded-xl overflow-hidden hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-300"
                >
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-20"></span>
                  <span className="relative flex items-center">Explore Now <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} /></span>
                </Link>
                <Link 
                  to="/shop?cat=Laptops" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-slate-900/50 hover:bg-slate-800 text-white font-semibold rounded-xl border border-slate-700 hover:border-brand-500/50 transition-all backdrop-blur-sm"
                >
                  <Laptop className="mr-2 text-brand-500" size={20} /> View Laptops
                </Link>
              </div>
            </div>

            {/* Hero Image / 3D Composition */}
            <div className="hidden lg:block relative w-[500px] h-[500px] animate-in zoom-in duration-1000 delay-200">
               {/* Glowing Ring Background */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-slate-800 rounded-full animate-[spin_20s_linear_infinite]"></div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-dashed border-slate-700/50 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

               {/* Central Floating Element */}
               <div 
                 className="absolute inset-0 bg-gradient-to-tr from-slate-900 to-slate-800 rounded-3xl border border-slate-700 shadow-2xl flex items-center justify-center rotate-3 hover:rotate-0 transition-all duration-500 z-20 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]"
                 style={{ transform: `perspective(1000px) rotateY(${mousePos.x * 0.01}deg) rotateX(${mousePos.y * -0.01}deg)` }}
               >
                  <div className="relative w-[90%] h-[90%] rounded-2xl overflow-hidden">
                    <img 
                        src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600" 
                        alt="Hero Tech" 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute -bottom-6 -left-6 bg-[#0f172a] p-5 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-4 animate-float">
                     <div className="bg-brand-500/10 p-3 rounded-xl text-brand-500 border border-brand-500/20">
                        <ShieldCheck size={24} />
                     </div>
                     <div>
                        <p className="text-[10px] text-brand-500 font-mono uppercase tracking-widest">Protection</p>
                        <p className="text-sm font-bold text-white">Verified Warranty</p>
                     </div>
                  </div>
                  
                  {/* Additional Floating Badge */}
                  <div className="absolute -top-4 -right-4 bg-[#0f172a] p-4 rounded-xl shadow-xl border border-slate-800 animate-float delay-1000">
                     <Zap size={20} className="text-brand-400 fill-brand-400" />
                  </div>
               </div>

               {/* Background Decorative Squares */}
               <div className="absolute inset-0 bg-brand-600 rounded-3xl -rotate-6 opacity-10 scale-95 z-10"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Grid - Glassmorphism Style */}
      <section className="container mx-auto px-4 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: <Truck size={32} />, title: 'Nationwide Delivery', desc: 'Fast shipping across Nigeria' },
            { icon: <ShieldCheck size={32} />, title: '1 Year Warranty', desc: 'On all gadgets sold' },
            { icon: <CreditCard size={32} />, title: 'Easy Payments', desc: 'Installments & Pay on Delivery' },
            { icon: <Clock size={32} />, title: '24/7 Support', desc: 'Expert technical assistance' },
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-900/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-slate-800 hover:border-brand-500/30 hover:bg-slate-800 transition-all duration-300 group">
              <div className="w-14 h-14 bg-slate-800 group-hover:bg-brand-500 group-hover:text-slate-900 text-brand-500 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 border border-slate-700 group-hover:border-brand-400">
                {item.icon}
              </div>
              <h3 className="font-bold text-lg text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 pt-10">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white">Browse Categories</h2>
            <p className="text-slate-400 mt-2 font-light">Find exactly what you need</p>
          </div>
          <Link to="/shop" className="text-brand-500 font-semibold hover:text-brand-400 flex items-center text-sm uppercase tracking-wider">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.values(Category).map((cat) => (
            <Link 
              key={cat} 
              to={`/shop?cat=${cat}`}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-slate-900 border border-slate-800 hover:border-brand-500/50 transition-all"
            >
              <img 
                src={categoryImages[cat]} 
                alt={cat}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-4 w-full">
                <div className="w-8 h-1 bg-brand-500 mb-2 rounded-full w-0 group-hover:w-8 transition-all duration-300"></div>
                <h3 className="text-white font-bold text-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{cat}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10 border-b border-slate-800 pb-4">
          <h2 className="text-3xl font-bold text-white">Trending Now</h2>
          <div className="hidden sm:flex space-x-2">
             <div className="h-2 w-2 rounded-full bg-brand-500 animate-pulse"></div>
             <div className="h-2 w-2 rounded-full bg-slate-700"></div>
             <div className="h-2 w-2 rounded-full bg-slate-700"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promo Section */}
      <section className="container mx-auto px-4">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-16 relative overflow-hidden flex items-center group border border-slate-800">
          
          {/* Grid Pattern overlay on promo */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: `linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)`, backgroundSize: '20px 20px' }}>
          </div>

          <div className="relative z-10 max-w-lg">
            <span className="text-brand-500 font-bold tracking-[0.2em] text-xs uppercase bg-brand-900/20 px-3 py-1 rounded-full border border-brand-500/20">Limited Offer</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6 leading-tight">10% Off Apple Products</h2>
            <p className="text-slate-400 mb-8 text-lg">Use code <span className="text-brand-400 font-mono bg-brand-900/20 px-2 py-1 rounded border border-brand-500/30 border-dashed">GABNORK10</span> at checkout. Valid for purchases over ₦500,000.</p>
            <Link to="/shop" className="bg-brand-500 text-slate-950 px-8 py-3 rounded-xl font-bold hover:bg-brand-400 transition-colors inline-block shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              Claim Offer
            </Link>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-brand-900/10 to-transparent hidden md:block"></div>
           {/* Abstract Interactive Shapes */}
           <div className="absolute top-1/2 right-10 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
           <div className="absolute bottom-[-50px] left-[20%] w-40 h-40 bg-brand-500/5 rounded-full blur-2xl animate-pulse"></div>
        </div>
      </section>
    </div>
  );
};