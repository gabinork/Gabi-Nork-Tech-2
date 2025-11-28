import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, Truck, ShieldCheck, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../constants';

export const Checkout = () => {
  const { cart, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');

  const shippingCost = shippingMethod === 'express' ? 2000 : 0;
  const finalTotal = totalAmount + shippingCost;

  if (cart.length === 0 && step === 1) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Your cart is empty</h2>
        <button onClick={() => navigate('/shop')} className="text-brand-600 underline">Go back to shop</button>
      </div>
    );
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate processing
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      clearCart();
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Steps */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors duration-300 ${step >= s ? 'bg-brand-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                {step > s ? <CheckCircle size={20} /> : s}
              </div>
              {s < 3 && <div className={`w-20 h-1 transition-colors duration-300 ${step > s ? 'bg-brand-600' : 'bg-slate-100 dark:bg-slate-800'}`}></div>}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="grid md:grid-cols-2 gap-12">
            <form id="checkout-form" onSubmit={() => setStep(2)} className="space-y-8">
              
              {/* Shipping Address */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
                  Shipping Details
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">First Name</label>
                    <input required type="text" className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Last Name</label>
                    <input required type="text" className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                  <input required type="email" className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Street Address</label>
                  <input required type="text" className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">City</label>
                    <input required type="text" className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">State</label>
                    <select className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-colors">
                      <option>Lagos</option>
                      <option>Abuja</option>
                      <option>Rivers</option>
                      <option>Oyo</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number</label>
                  <input required type="tel" className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-colors" />
                </div>
              </div>

              {/* Shipping Method */}
              <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Shipping Method</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className={`relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all ${shippingMethod === 'standard' ? 'border-brand-600 bg-brand-50 dark:bg-brand-900/10' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'}`}>
                    <input 
                      type="radio" 
                      name="shipping" 
                      className="sr-only" 
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                    />
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-slate-900 dark:text-white flex items-center">
                        <Truck size={18} className="mr-2 text-slate-500" /> Standard
                      </span>
                      <span className="text-green-600 dark:text-green-400 font-bold text-sm">Free</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Delivery: 3-5 Business Days</p>
                    {shippingMethod === 'standard' && <div className="absolute top-2 right-2 w-3 h-3 bg-brand-600 rounded-full"></div>}
                  </label>

                  <label className={`relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all ${shippingMethod === 'express' ? 'border-brand-600 bg-brand-50 dark:bg-brand-900/10' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'}`}>
                    <input 
                      type="radio" 
                      name="shipping" 
                      className="sr-only" 
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                    />
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-slate-900 dark:text-white flex items-center">
                        <Zap size={18} className="mr-2 text-brand-500" fill="currentColor" /> Express
                      </span>
                      <span className="text-slate-900 dark:text-white font-bold text-sm">{formatCurrency(2000)}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Delivery: 1-2 Business Days</p>
                    {shippingMethod === 'express' && <div className="absolute top-2 right-2 w-3 h-3 bg-brand-600 rounded-full"></div>}
                  </label>
                </div>
              </div>

            </form>

            {/* Order Summary */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl h-fit border border-slate-100 dark:border-slate-800 sticky top-24">
              <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Order Summary</h3>
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-slate-600 dark:text-slate-300">
                    <span>{item.quantity}x {item.name}</span>
                    <span className="font-medium text-slate-900 dark:text-white">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Subtotal</span>
                  <span className="text-slate-900 dark:text-white">{formatCurrency(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Shipping</span>
                  <span className={`font-medium ${shippingCost === 0 ? 'text-green-600 dark:text-green-400' : 'text-slate-900 dark:text-white'}`}>
                    {shippingCost === 0 ? 'Free' : formatCurrency(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-4 border-t border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                  <span>Total</span>
                  <span className="text-brand-600 dark:text-brand-500">{formatCurrency(finalTotal)}</span>
                </div>
              </div>
              <button 
                form="checkout-form"
                type="submit"
                className="w-full mt-6 bg-slate-900 dark:bg-brand-600 text-white py-4 rounded-xl font-bold hover:bg-brand-600 dark:hover:bg-brand-700 transition-colors shadow-lg shadow-slate-200 dark:shadow-none"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">Payment Method</h2>
            <p className="text-slate-500 dark:text-slate-400 text-center mb-8 text-sm">
              Total to pay: <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(finalTotal)}</span>
            </p>

            <form onSubmit={handlePayment} className="space-y-4">
              <label className="block relative">
                <input type="radio" name="payment" className="peer sr-only" defaultChecked />
                <div className="p-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 peer-checked:border-brand-600 dark:peer-checked:border-brand-500 peer-checked:bg-brand-50 dark:peer-checked:bg-brand-900/20 cursor-pointer flex items-center transition-all">
                  <CreditCard className="mr-3 text-slate-600 dark:text-slate-400 peer-checked:text-brand-600 dark:peer-checked:text-brand-400" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Card Payment</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Pay securely with Paystack / Flutterwave</p>
                  </div>
                </div>
              </label>

              <label className="block relative">
                <input type="radio" name="payment" className="peer sr-only" />
                <div className="p-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 peer-checked:border-brand-600 dark:peer-checked:border-brand-500 peer-checked:bg-brand-50 dark:peer-checked:bg-brand-900/20 cursor-pointer flex items-center transition-all">
                  <Truck className="mr-3 text-slate-600 dark:text-slate-400 peer-checked:text-brand-600 dark:peer-checked:text-brand-400" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Pay on Delivery</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Cash or Transfer upon arrival</p>
                  </div>
                </div>
              </label>

              <label className="block relative">
                <input type="radio" name="payment" className="peer sr-only" />
                <div className="p-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 peer-checked:border-brand-600 dark:peer-checked:border-brand-500 peer-checked:bg-brand-50 dark:peer-checked:bg-brand-900/20 cursor-pointer flex items-center transition-all">
                  <ShieldCheck className="mr-3 text-slate-600 dark:text-slate-400 peer-checked:text-brand-600 dark:peer-checked:text-brand-400" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Installment Plan</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Spread payments over 3-6 months</p>
                  </div>
                </div>
              </label>
              
              <div className="flex gap-4 mt-8">
                 <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white py-4 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Back
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-[2] bg-brand-600 text-white py-4 rounded-xl font-bold hover:bg-brand-700 transition-colors disabled:opacity-70 flex justify-center items-center shadow-lg shadow-brand-500/20"
                >
                  {loading ? 'Processing...' : `Pay ${formatCurrency(finalTotal)}`}
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-12 animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Order Confirmed!</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
              Thank you for your purchase. Your order has been placed successfully.
              <br/>
              <span className="text-sm mt-2 block">Order ID: <span className="font-mono font-bold text-brand-600 dark:text-brand-400">#GB-{Math.floor(Math.random() * 10000)}</span></span>
            </p>
            <div className="flex justify-center space-x-4">
              <button onClick={() => navigate('/shop')} className="bg-slate-900 dark:bg-slate-700 text-white px-8 py-3 rounded-xl font-medium hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors">
                Continue Shopping
              </button>
              <button onClick={() => navigate('/track')} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-8 py-3 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                Track Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};