import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock, AlertCircle, MapPin, ArrowRight } from 'lucide-react';

type OrderStatus = 'placed' | 'processing' | 'shipped' | 'delivered';

interface TrackingResult {
  orderId: string;
  status: OrderStatus;
  estimatedDelivery: string;
  currentLocation: string;
  history: {
    stage: string;
    date: string;
    completed: boolean;
    location?: string;
  }[];
}

export const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setIsLoading(true);
    setError('');
    setResult(null);

    // Simulate API delay
    setTimeout(() => {
      // Basic validation simulation
      if (orderId.length < 3) {
        setError('Please enter a valid Order ID (e.g., GB-8492)');
        setIsLoading(false);
        return;
      }

      // Mock Random Status Generation
      const statuses: OrderStatus[] = ['placed', 'processing', 'shipped', 'delivered'];
      // Deterministic random based on ID length to be consistent for demo
      const randomStatusIndex = orderId.length % 4; 
      const status = statuses[randomStatusIndex];
      
      const mockHistory = [
        { stage: 'Order Placed', date: 'Oct 20, 2024 - 10:00 AM', completed: true, location: 'Online' },
        { stage: 'Payment Confirmed', date: 'Oct 20, 2024 - 10:05 AM', completed: true, location: 'Online' },
        { stage: 'Processing', date: 'Oct 21, 2024 - 09:30 AM', completed: status !== 'placed', location: 'Lagos Warehouse' },
        { stage: 'Shipped', date: 'Oct 22, 2024 - 02:00 PM', completed: status === 'shipped' || status === 'delivered', location: 'In Transit' },
        { stage: 'Delivered', date: status === 'delivered' ? 'Oct 24, 2024 - 11:45 AM' : 'Pending', completed: status === 'delivered', location: 'Customer Address' },
      ];

      const mockResult: TrackingResult = {
        orderId: orderId.toUpperCase(),
        status: status,
        estimatedDelivery: status === 'delivered' ? 'Delivered' : 'Oct 25, 2024',
        currentLocation: status === 'delivered' ? 'Delivered' : (status === 'shipped' ? 'Abuja Sorting Hub' : 'Lagos Warehouse'),
        history: mockHistory.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? -1 : 1)) // completed first
      };

      setResult(mockResult);
      setIsLoading(false);
    }, 1500);
  };

  const getProgressPercentage = (status: OrderStatus) => {
    switch(status) {
      case 'placed': return 15;
      case 'processing': return 40;
      case 'shipped': return 70;
      case 'delivered': return 100;
      default: return 0;
    }
  };

  const isStepActive = (stepStatus: OrderStatus, currentStatus: OrderStatus) => {
    const levels = { placed: 1, processing: 2, shipped: 3, delivered: 4 };
    return levels[stepStatus] <= levels[currentStatus];
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 relative overflow-hidden">
      
      {/* 1. Continuous Technical Grid Background (Same as Home) */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #64748b 1px, transparent 1px), linear-gradient(to bottom, #64748b 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* 2. Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Content */}
      <div className="relative z-10 pt-20 pb-20">
         
         {/* Header Section (Transparent to allow background flow) */}
         <div className="container mx-auto px-4 text-center mb-12">
            <div className="inline-flex items-center justify-center p-4 bg-brand-500/10 rounded-2xl mb-8 ring-1 ring-brand-500/30 backdrop-blur-sm shadow-lg shadow-brand-500/5">
                <Package className="text-brand-500 w-10 h-10" strokeWidth={1.5} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Track Your Order
            </h1>
            <p className="text-slate-400 max-w-lg mx-auto text-lg leading-relaxed">
              Real-time updates on your tech gear. Enter your Order ID to see exactly where your package is.
            </p>
         </div>

         <div className="container mx-auto px-4">
            
            {/* Search Box - Glassmorphism */}
            <div className="max-w-xl mx-auto bg-slate-900/60 backdrop-blur-xl p-3 rounded-2xl border border-slate-700/50 shadow-2xl mb-12 relative group hover:border-brand-500/30 transition-colors">
                <form onSubmit={handleTrack} className="flex items-center gap-2">
                    <div className="pl-4 text-slate-500 group-focus-within:text-brand-500 transition-colors">
                        <Search size={22} />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Enter Order ID (e.g. GB-8492)"
                        className="flex-1 bg-transparent border-none text-white px-4 py-4 focus:ring-0 placeholder-slate-500 outline-none font-mono tracking-wider text-lg"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                    />
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="bg-brand-600 hover:bg-brand-500 text-white px-8 py-4 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center shadow-lg shadow-brand-900/20"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            'Track'
                        )}
                    </button>
                </form>
            </div>

            {/* Loading Indicator */}
            {isLoading && (
              <div className="max-w-4xl mx-auto py-12 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500">
                  <div className="relative w-20 h-20 mb-6">
                      <div className="absolute inset-0 border-t-2 border-brand-500 rounded-full animate-spin"></div>
                      <div className="absolute inset-2 border-r-2 border-brand-400/50 rounded-full animate-spin reverse" style={{ animationDuration: '1.5s' }}></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></div>
                      </div>
                  </div>
                  <p className="text-brand-500 font-mono tracking-[0.2em] text-sm animate-pulse">
                      SEARCHING NETWORK...
                  </p>
              </div>
            )}

            {!isLoading && error && (
                <div className="max-w-xl mx-auto p-4 bg-red-900/20 border border-red-800/50 rounded-xl text-red-400 flex items-center justify-center space-x-2 animate-in fade-in slide-in-from-top-2 mb-8 backdrop-blur-sm">
                    <AlertCircle size={20} />
                    <span>{error}</span>
                </div>
            )}

            {/* Results Card */}
            {!isLoading && result && (
                <div className="max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl p-6 md:p-12 animate-in slide-in-from-bottom-8 duration-700 shadow-2xl relative overflow-hidden">
                    
                    {/* Inner Card Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-[80px] pointer-events-none"></div>

                    {/* Status Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 pb-8 border-b border-slate-800/60 gap-6 relative z-10">
                        <div>
                            <span className="text-slate-500 text-xs uppercase tracking-[0.2em] font-bold">Order ID</span>
                            <h2 className="text-3xl font-bold text-white mt-2 tracking-tight font-mono text-brand-50">#{result.orderId}</h2>
                        </div>
                        <div className="flex flex-col md:items-end">
                            <span className="text-slate-500 text-xs uppercase tracking-[0.2em] font-bold">Estimated Delivery</span>
                            <p className="text-xl font-bold text-brand-400 mt-2 flex items-center">
                                {result.estimatedDelivery}
                            </p>
                        </div>
                    </div>

                    {/* Progress Visualization */}
                    <div className="relative mb-16 px-4 md:px-8 z-10">
                        {/* Background Line */}
                        <div className="absolute top-[20px] left-0 w-full h-1 bg-slate-800 rounded-full z-0"></div>
                        
                        {/* Active Line */}
                        <div 
                            className="absolute top-[20px] left-0 h-1 bg-gradient-to-r from-brand-600 to-brand-400 rounded-full z-0 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                            style={{ width: `${getProgressPercentage(result.status)}%` }}
                        ></div>
                        
                        {/* Steps */}
                        <div className="relative z-10 flex justify-between w-full">
                            {[
                                { id: 'placed', icon: Package, label: 'Placed' },
                                { id: 'processing', icon: Clock, label: 'Processing' },
                                { id: 'shipped', icon: Truck, label: 'Shipped' },
                                { id: 'delivered', icon: CheckCircle, label: 'Delivered' }
                            ].map((step) => {
                                const active = isStepActive(step.id as OrderStatus, result.status);
                                const Icon = step.icon;
                                
                                return (
                                    <div key={step.id} className="flex flex-col items-center group cursor-default">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500 z-10 ${
                                            active 
                                            ? 'bg-brand-500 border-brand-900 text-slate-900 shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-110' 
                                            : 'bg-slate-900 border-slate-700 text-slate-500'
                                        }`}>
                                            <Icon size={16} strokeWidth={2.5} />
                                        </div>
                                        <span className={`text-xs font-bold uppercase tracking-wider mt-4 transition-colors duration-300 ${
                                            active ? 'text-brand-400' : 'text-slate-600'
                                        }`}>
                                            {step.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Timeline History */}
                    <div className="space-y-8 relative z-10">
                        {/* Vertical Line */}
                        <div className="absolute top-0 bottom-0 left-[19px] w-px bg-slate-800/60"></div>

                        {result.history.map((event, index) => (
                            <div key={index} className="relative flex items-start group">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2 transition-all ${
                                    event.completed 
                                    ? 'bg-slate-900 border-brand-500 text-brand-500 shadow-[0_0_10px_rgba(245,158,11,0.2)]' 
                                    : 'bg-slate-900 border-slate-700 text-slate-700'
                                }`}>
                                    {event.completed ? <CheckCircle size={16} /> : <div className="w-2 h-2 rounded-full bg-slate-700"></div>}
                                </div>
                                <div className="ml-6 pt-1">
                                    <h4 className={`text-lg font-bold mb-1 ${event.completed ? 'text-white' : 'text-slate-500'}`}>
                                        {event.stage}
                                    </h4>
                                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                        <span className="flex items-center">
                                            <Clock size={14} className="mr-2 text-brand-500/50" /> {event.date}
                                        </span>
                                        {event.location && (
                                            <span className="flex items-center">
                                                <MapPin size={14} className="mr-2 text-brand-500/50" /> {event.location}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Help Section */}
                    <div className="mt-12 pt-8 border-t border-slate-800/60 flex items-center justify-between">
                        <p className="text-slate-400 text-sm">Need help with your order?</p>
                        <button className="text-white hover:text-brand-400 text-sm font-bold flex items-center transition-colors">
                            Contact Support <ArrowRight size={16} className="ml-2" />
                        </button>
                    </div>

                </div>
            )}
         </div>
      </div>
    </div>
  );
};