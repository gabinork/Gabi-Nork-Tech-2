import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle, Chrome } from 'lucide-react';

export const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-brand-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
          
          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Create an Account</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Join GabNork Tech to track orders and get exclusive deals.</p>
          </div>

          {isSuccess ? (
            <div className="p-8 text-center animate-in zoom-in duration-300">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Account Created!</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Redirecting you to login...</p>
            </div>
          ) : (
            <div className="px-8 pb-8">
              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button className="flex items-center justify-center space-x-2 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Chrome size={18} /> <span>Google</span>
                </button>
                <button className="flex items-center justify-center space-x-2 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-slate-700 dark:text-slate-300">
                   {/* Apple Icon SVG */}
                   <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.62 4.5-1.62.36 0 .7.01 1.03.04-2.67 2-2.75 6.6 1 8.07-.24.73-.65 2.44-1.61 5.74zM12.05 5.26c.69-1.74 3.01-2.57 2.87.16-.16 2.28-2.45 3.1-2.87-.16z"/></svg>
                   <span>Apple</span>
                </button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white dark:bg-slate-900 text-slate-400">Or register with email</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-slate-400" />
                    </div>
                    <input
                      name="fullName"
                      type="text"
                      required
                      placeholder="Emmanuel Doe"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all text-sm"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-slate-400" />
                    </div>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all text-sm"
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
                      className="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all text-sm"
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

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 ml-1">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-slate-400" />
                    </div>
                    <input
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all text-sm"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-500/20 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Create Account <ArrowRight size={18} className="ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Footer */}
          <div className="bg-slate-50 dark:bg-slate-950 p-4 text-center border-t border-slate-100 dark:border-slate-800">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
        
        <p className="text-center text-xs text-slate-400 mt-6">
          By creating an account, you agree to our <Link to="/terms" className="underline hover:text-brand-500">Terms of Service</Link> and <Link to="/privacy" className="underline hover:text-brand-500">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
};
