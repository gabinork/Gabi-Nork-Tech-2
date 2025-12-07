import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, Clock, ExternalLink, User, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../constants';

// Mock Order Data for demonstration
const MOCK_ORDERS = [
  {
    id: 'GB-8492',
    date: 'Oct 24, 2024',
    total: 1250000,
    status: 'Delivered',
    items: ['GabNork ProBook X1', 'SonicBlast Pro Earbuds']
  },
  {
    id: 'GB-7731',
    date: 'Oct 10, 2024',
    total: 45000,
    status: 'Shipped',
    items: ['Nomad PowerBank 20k']
  },
  {
    id: 'GB-6219',
    date: 'Sep 28, 2024',
    total: 850000,
    status: 'Processing',
    items: ['TechnoSphere Z5 Phone']
  }
];

export const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="max-w-md mx-auto bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
            <User size={48} className="mx-auto text-slate-400 mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Please Log In</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">You need to be logged in to view your profile and order history.</p>
            <Link to="/login" className="block w-full bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-xl font-bold transition-colors">Go to Login</Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'delivered': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'shipped': return 'text-brand-500 bg-brand-500/10 border-brand-500/20';
      case 'processing': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      default: return 'text-slate-500 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Profile</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your account and view order history.</p>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 flex items-center space-x-2 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Account Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* User Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm sticky top-24">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-24 h-24 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-3xl font-bold text-brand-600 dark:text-brand-400 mb-4 border-4 border-white dark:border-slate-800 shadow-lg overflow-hidden">
                  {user.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" /> : user.name.charAt(0)}
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{user.email}</p>
                <span className="mt-3 px-3 py-1 bg-brand-50 dark:bg-brand-900/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider rounded-full border border-brand-200 dark:border-brand-800/30">
                  Premium Member
                </span>
              </div>

              <div className="space-y-1">
                <button className="w-full flex items-center space-x-3 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 p-3 rounded-xl transition-colors text-left">
                  <User size={18} className="text-slate-400" />
                  <span className="text-sm font-medium">Edit Profile</span>
                </button>
                <button className="w-full flex items-center space-x-3 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 p-3 rounded-xl transition-colors text-left">
                  <MapPin size={18} className="text-slate-400" />
                  <span className="text-sm font-medium">Manage Addresses</span>
                </button>
                <button className="w-full flex items-center space-x-3 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 p-3 rounded-xl transition-colors text-left">
                  <Mail size={18} className="text-slate-400" />
                  <span className="text-sm font-medium">Email Preferences</span>
                </button>
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
              <Package className="mr-2 text-brand-600" /> Order History
            </h3>

            <div className="space-y-4">
              {MOCK_ORDERS.map((order) => (
                <div key={order.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-brand-500/30 transition-all shadow-sm group">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3">
                         <span className="font-mono font-bold text-lg text-slate-900 dark:text-white">#{order.id}</span>
                         <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(order.status)} uppercase tracking-wider`}>
                            {order.status}
                         </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center">
                        <Clock size={12} className="mr-1" /> Placed on {order.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-slate-900 dark:text-white">{formatCurrency(order.total)}</p>
                    </div>
                  </div>

                  <div className="py-4 border-t border-dashed border-slate-200 dark:border-slate-800">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Items Purchased</p>
                    <ul className="space-y-2">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Link 
                      to="/track" 
                      className="inline-flex items-center px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-bold hover:bg-brand-600 hover:text-white dark:hover:bg-brand-600 dark:hover:text-white transition-colors"
                    >
                      View Details <ExternalLink size={16} className="ml-2" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {MOCK_ORDERS.length === 0 && (
                 <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
                    <Package size={48} className="mx-auto text-slate-300 dark:text-slate-700 mb-4" strokeWidth={1} />
                    <p className="text-slate-900 dark:text-white font-medium">No orders found</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 mb-6">You haven't placed any orders yet.</p>
                    <Link to="/shop" className="bg-brand-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-brand-700">Start Shopping</Link>
                 </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
