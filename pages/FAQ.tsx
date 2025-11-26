import React, { useState } from 'react';
import { ChevronDown, Search, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQS = [
  {
    question: "What is Gabi Nork Tech?",
    answer: "Gabi Nork Tech is a Nigerian online tech store where you can buy gadgets like smartwatches, laptops, phones, earbuds, and accessories at affordable prices."
  },
  {
    question: "Do you deliver nationwide?",
    answer: "Yes, we deliver to all states in Nigeria through reliable courier partners."
  },
  {
    question: "What currency do you use on the platform?",
    answer: "All prices are listed in Naira (₦)."
  },
  {
    question: "Do you offer installment or payment plans?",
    answer: "Yes, we provide flexible payment plans that allow you to pay in installments depending on the product and plan selected."
  },
  {
    question: "How long does delivery take?",
    answer: "Delivery usually takes 1–3 business days within major cities and 3–7 business days for other locations."
  },
  {
    question: "Are your products original?",
    answer: "Yes, all products on Gabi Nork Tech are 100% original and sourced from trusted manufacturers and distributors."
  },
  {
    question: "Can I return or exchange a product?",
    answer: "Yes. You can request a return or exchange within our return window, as long as the item is in its original condition and packaging."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept bank transfers, debit cards, and approved installment plan options on checkout."
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach our support team through the Contact page, email, WhatsApp, or by calling our customer care line."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = FAQS.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
          Find answers to common questions about Gabi Nork Tech's products, delivery, and payment options.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-10 group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={20} className="text-slate-400 group-focus-within:text-brand-500 transition-colors" />
        </div>
        <input
          type="text"
          className="block w-full pl-11 pr-4 py-4 border border-slate-200 dark:border-slate-800 rounded-2xl leading-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all shadow-sm hover:shadow-md"
          placeholder="Search for a question..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-300 ${
                  isOpen 
                    ? 'border-brand-500/30 shadow-lg shadow-brand-500/5 dark:shadow-none' 
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                } overflow-hidden`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className={`font-semibold text-lg pr-8 transition-colors ${isOpen ? 'text-brand-600 dark:text-brand-400' : 'text-slate-900 dark:text-white'}`}>
                    {faq.question}
                  </span>
                  <div className={`bg-slate-50 dark:bg-slate-800 p-2 rounded-full transition-all duration-300 ${isOpen ? 'rotate-180 bg-brand-50 dark:bg-brand-900/20' : ''}`}>
                     <ChevronDown className={`${isOpen ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}`} size={20} />
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6 pt-0 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
             <Search size={48} className="mx-auto text-slate-300 dark:text-slate-700 mb-4" strokeWidth={1} />
            <p className="text-slate-900 dark:text-white font-medium">No questions found</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Try searching for something else or contact support.</p>
          </div>
        )}
      </div>
      
      <div className="mt-16 bg-slate-900 dark:bg-slate-800 rounded-3xl p-8 md:p-10 text-center relative overflow-hidden">
        <div className="relative z-10">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm text-white">
            <MessageCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Still have questions?</h2>
          <p className="text-slate-300 mb-8 max-w-md mx-auto">Can't find the answer you're looking for? Please chat to our friendly team.</p>
          <Link 
            to="/contact" 
            className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-slate-900 font-bold rounded-xl hover:bg-brand-50 transition-all shadow-lg"
          >
            Contact Support
          </Link>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-brand-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};