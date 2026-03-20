import React from 'react';
import { motion } from 'motion/react';
import { LogIn, ShoppingBag, ShieldCheck, Zap } from 'lucide-react';
import { auth, googleProvider, signInWithPopup } from '../firebase';

export const Login: React.FC = () => {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="h-full w-full bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[32px] shadow-2xl shadow-primary/10 p-8 relative z-10 border border-slate-100"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center shadow-xl shadow-primary/30 mb-6 rotate-6 group hover:rotate-0 transition-all duration-500">
            <ShoppingBag size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Welcome Back!</h1>
          <p className="text-slate-500 font-medium">Log in to access your fresh groceries and exclusive deals.</p>
        </div>

        <div className="space-y-4 mb-10">
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Secure Checkout</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Your data is protected</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Fast Delivery</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Freshness guaranteed</p>
            </div>
          </div>
        </div>

        <button 
          onClick={handleLogin}
          className="w-full h-16 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-4 text-lg group"
        >
          <LogIn size={24} className="group-hover:translate-x-1 transition-transform" />
          Continue with Google
        </button>

        <p className="mt-8 text-center text-xs text-slate-400 font-medium">
          By continuing, you agree to our <span className="text-primary font-bold cursor-pointer hover:underline">Terms of Service</span> and <span className="text-primary font-bold cursor-pointer hover:underline">Privacy Policy</span>.
        </p>
      </motion.div>

      {/* Footer Branding */}
      <div className="mt-12 flex items-center gap-2 text-slate-300 font-black tracking-widest uppercase text-[10px]">
        <div className="w-4 h-4 bg-slate-200 rounded-full" />
        FreshMarket Express
      </div>
    </div>
  );
};
