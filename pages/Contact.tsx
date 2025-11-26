import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle } from 'lucide-react';

export const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Get in Touch</h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">Have questions about our products or need technical support? We're here to help you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
                <div className="bg-slate-900 dark:bg-slate-800 text-white p-8 rounded-3xl shadow-xl overflow-hidden relative">
                    <div className="relative z-10 space-y-8">
                        <div>
                            <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-white/10 p-3 rounded-xl">
                                        <Phone size={20} className="text-amber-400" />
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Phone</p>
                                        <p className="font-medium">07030337982</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="bg-white/10 p-3 rounded-xl">
                                        <Mail size={20} className="text-amber-400" />
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Email</p>
                                        <p className="font-medium break-all">gabinorktech@gmail.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="bg-white/10 p-3 rounded-xl">
                                        <MapPin size={20} className="text-amber-400" />
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Address</p>
                                        <p className="font-medium leading-relaxed">House No. 18 Ezekwe Street,<br/>Flat 6, Kado</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="pt-8 border-t border-white/10">
                             <div className="flex items-start space-x-4">
                                <div className="bg-white/10 p-3 rounded-xl">
                                    <Clock size={20} className="text-amber-400" />
                                </div>
                                <div>
                                    <p className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Business Hours</p>
                                    <p className="font-medium">Mon - Fri: 9:00 AM - 6:00 PM</p>
                                    <p className="font-medium">Sat: 10:00 AM - 4:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Circles */}
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-brand-500/20 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-amber-500/20 rounded-full blur-2xl"></div>
                </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                {isSubmitted ? (
                     <div className="h-full flex flex-col items-center justify-center text-center py-10">
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6 animate-in zoom-in">
                            <CheckCircle size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                        <p className="text-slate-500 dark:text-slate-400 max-w-md">
                            Thank you for reaching out. Our team will get back to you within 24 hours.
                        </p>
                     </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send us a Message</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Your Name</label>
                                <input 
                                    type="text" 
                                    required
                                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                                    placeholder="John Doe"
                                    value={formState.name}
                                    onChange={e => setFormState({...formState, name: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                                <input 
                                    type="email" 
                                    required
                                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                                    placeholder="john@example.com"
                                    value={formState.email}
                                    onChange={e => setFormState({...formState, email: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Subject</label>
                            <input 
                                type="text" 
                                required
                                className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                                placeholder="Product Inquiry"
                                value={formState.subject}
                                onChange={e => setFormState({...formState, subject: e.target.value})}
                            />
                        </div>
                         <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                            <textarea 
                                required
                                rows={5}
                                className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all resize-none"
                                placeholder="How can we help you?"
                                value={formState.message}
                                onChange={e => setFormState({...formState, message: e.target.value})}
                            />
                        </div>
                        <button 
                            type="submit"
                            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-500/20 transition-all flex items-center justify-center"
                        >
                            <Send size={18} className="mr-2" /> Send Message
                        </button>
                    </form>
                )}
            </div>
        </div>
    </div>
  );
};
