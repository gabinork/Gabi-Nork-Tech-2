import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle, LayoutDashboard } from 'lucide-react';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API verification
    setTimeout(() => {
      // Hardcoded demo credentials
      if (formData.email === 'admin@gabinork.com' && formData.password === 'admin123') {
        setIsLoading(false);
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/'); // Redirect to home/dashboard
        }, 1500);
      } else {
        setIsLoading(false);
        setError('Invalid admin credentials. Please contact IT support.');
      }
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[30%] w-[50%] h-[50%] bg-slate-200/20 dark:bg-slate-800/20 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
          
          {/* Header */}
          <div className="bg-slate-900 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-600/10"></div>
            <div className="relative z-10">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 text-amber-400">
                    <ShieldCheck size={32} />
                </div>
                <h1 className="text-2xl font-bold text-white mb-1">Admin Portal</h1>
                <p className="text-slate-400 text-xs uppercase tracking-widest">Authorized Personnel Only</p>
            </div>
          </div>

          <div className="p-8">
            {isSuccess ? (
                <div className="text-center py-8 animate-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <LayoutDashboard size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Welcome Back</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Redirecting to dashboard...</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl flex items-start space-x-3 animate-in slide-in-from-top-2">
                            <AlertCircle size={20} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 ml-1">Admin Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail size={18} className="text-slate-400" />
                            </div>
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="admin@gabinork.com"
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all text-sm"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 ml-1">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock size={18} className="text-slate-400" />
                            </div>
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                placeholder="••••••••"
                                className="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all text-sm"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" className="rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                            <span className="text-slate-600 dark:text-slate-400">Remember device</span>
                        </label>
                        <a href="#" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 font-medium">Forgot password?</a>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-slate-500/20 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    Access Dashboard <ArrowRight size={18} className="ml-2" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            )}
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-950 p-4 text-center border-t border-slate-100 dark:border-slate-800">
             <Link to="/login" className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center justify-center">
                Not an admin? Switch to Customer Login
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};