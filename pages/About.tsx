import React from 'react';
import { CheckCircle, Globe, ShieldCheck, CreditCard, Zap } from 'lucide-react';

export const About = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-24 relative overflow-hidden">
         <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
         <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl"></div>
         
         <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-block p-3 bg-white/5 backdrop-blur-sm rounded-2xl mb-6 border border-white/10">
              <Zap className="text-amber-400 w-8 h-8" fill="currentColor" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About GabiNork Tech</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Connecting you to the future, one gadget at a time.
            </p>
         </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 -mt-10 relative z-20">
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100 dark:border-slate-800">
          
          <div className="space-y-8 text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-light">
            <p>
              <span className="font-semibold text-slate-900 dark:text-white">GabiNork Tech</span> is a modern Nigerian tech brand built to make quality gadgets easy to access, affordable, and reliable. We focus on delivering a smooth shopping experience for anyone looking to buy smartwatches, laptops, phones, earbuds, accessories, and other tech essentials.
            </p>
            
            <p>
              Our goal is simple: <span className="text-brand-600 dark:text-brand-400 font-medium">make premium technology available to everyone, without stress.</span> That’s why we offer clear pricing in Naira, flexible payment plans, fast nationwide delivery, and verified original products from trusted manufacturers.
            </p>

            <p>
              Whether you’re upgrading your devices, buying a gift, or setting up your workspace, GabiNork Tech gives you a safe place to shop with confidence. We combine clean design, reliable customer service, and a secure checkout system to make sure every order is easy from start to finish.
            </p>

            <p className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border-l-4 border-brand-500 text-slate-700 dark:text-slate-200 italic">
              "At GabiNork Tech, we’re passionate about innovation, quality, and customer satisfaction — and we’re here to help you stay connected to the tech that powers your world."
            </p>
          </div>

          {/* Values Grid */}
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-16 mb-8 text-center">Why Choose GabiNork?</h3>
          <div className="grid md:grid-cols-2 gap-6">
             <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl flex items-start space-x-4 hover:bg-brand-50 dark:hover:bg-brand-900/10 transition-colors border border-transparent hover:border-brand-200 dark:hover:border-brand-800/30">
                <div className="bg-white dark:bg-slate-800 p-3 rounded-xl text-brand-600 dark:text-brand-400 shadow-sm">
                   <Globe size={24} />
                </div>
                <div>
                   <h3 className="font-bold text-slate-900 dark:text-white mb-1">Nationwide Reach</h3>
                   <p className="text-sm text-slate-500 dark:text-slate-400">Reliable delivery to Lagos, Abuja, PH, and all states across Nigeria.</p>
                </div>
             </div>
             <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl flex items-start space-x-4 hover:bg-brand-50 dark:hover:bg-brand-900/10 transition-colors border border-transparent hover:border-brand-200 dark:hover:border-brand-800/30">
                <div className="bg-white dark:bg-slate-800 p-3 rounded-xl text-brand-600 dark:text-brand-400 shadow-sm">
                   <CreditCard size={24} />
                </div>
                <div>
                   <h3 className="font-bold text-slate-900 dark:text-white mb-1">Flexible Payments</h3>
                   <p className="text-sm text-slate-500 dark:text-slate-400">Pay securely with card, transfer, or enjoy our installment plans.</p>
                </div>
             </div>
             <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl flex items-start space-x-4 hover:bg-brand-50 dark:hover:bg-brand-900/10 transition-colors border border-transparent hover:border-brand-200 dark:hover:border-brand-800/30">
                <div className="bg-white dark:bg-slate-800 p-3 rounded-xl text-brand-600 dark:text-brand-400 shadow-sm">
                   <ShieldCheck size={24} />
                </div>
                <div>
                   <h3 className="font-bold text-slate-900 dark:text-white mb-1">100% Original</h3>
                   <p className="text-sm text-slate-500 dark:text-slate-400">We only sell authentic products from verified manufacturers.</p>
                </div>
             </div>
             <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl flex items-start space-x-4 hover:bg-brand-50 dark:hover:bg-brand-900/10 transition-colors border border-transparent hover:border-brand-200 dark:hover:border-brand-800/30">
                <div className="bg-white dark:bg-slate-800 p-3 rounded-xl text-brand-600 dark:text-brand-400 shadow-sm">
                   <CheckCircle size={24} />
                </div>
                <div>
                   <h3 className="font-bold text-slate-900 dark:text-white mb-1">Customer First</h3>
                   <p className="text-sm text-slate-500 dark:text-slate-400">Dedicated support team ready to help you before and after sales.</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};