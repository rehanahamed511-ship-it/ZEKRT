import React, { useState } from 'react';
import { useCart, DELIVERY_OPTIONS } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Plus, Minus, ShoppingBag, Truck, MapPin, CreditCard, Ticket, CheckCircle2, ChevronRight } from 'lucide-react';

export const Cart: React.FC = () => {
  const { cart, updateQuantity, total, subtotal, deliveryOption, setDeliveryOption, clearCart } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);
  const [promoCode, setPromoCode] = useState('');

  const handlePlaceOrder = () => {
    setIsOrdered(true);
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  if (isOrdered) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full w-full flex flex-col items-center justify-center bg-white px-8 text-center"
      >
        <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mb-6 shadow-inner">
          <CheckCircle2 size={48} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Order Placed!</h2>
        <p className="text-sm text-slate-400 max-w-[240px]">Your fresh groceries are on their way. You'll receive a confirmation email shortly.</p>
        <button 
          onClick={() => setIsOrdered(false)}
          className="mt-8 bg-primary text-white px-10 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20"
        >
          Track Order
        </button>
      </motion.div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center bg-white px-8 text-center">
        <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mb-6">
          <ShoppingBag size={40} className="text-slate-200" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
        <p className="text-sm text-slate-400">Looks like you haven't added anything to your cart yet.</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-white overflow-y-auto pb-80 no-scrollbar">
      <div className="px-4 pt-8 mb-6">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">My Cart</h1>
        <p className="text-sm text-slate-400 font-medium">{cart.length} items to checkout</p>
      </div>

      {/* Cart Items */}
      <div className="px-4 space-y-4 mb-8">
        {cart.map((item) => (
          <motion.div 
            layout
            key={item.id}
            className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm"
          >
            <div className="w-16 h-16 rounded-xl bg-slate-50 p-2 flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-slate-900 truncate">{item.name}</h3>
              <p className="text-xs font-black text-primary mt-0.5">${item.price}</p>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-2 py-1">
              <button 
                onClick={() => updateQuantity(item.id, -1)}
                className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-sm border border-slate-100 active:scale-90 transition-all"
              >
                <Minus size={14} strokeWidth={3} />
              </button>
              <span className="font-black text-sm min-w-[20px] text-center text-slate-900">{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, 1)}
                className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-sm border border-slate-100 active:scale-90 transition-all"
              >
                <Plus size={14} strokeWidth={3} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Delivery Address */}
      <div className="px-4 mb-8">
        <h3 className="font-black text-base text-slate-900 mb-4 flex items-center gap-2 tracking-tight">
          <MapPin size={18} className="text-primary" />
          Delivery Address
        </h3>
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between group active:bg-slate-100 transition-colors">
          <div className="flex-1">
            <p className="text-xs font-black text-slate-900 mb-0.5">Home Address</p>
            <p className="text-[10px] text-slate-500 font-medium truncate max-w-[200px]">123 Green Valley, Silicon Valley, CA 94025</p>
          </div>
          <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Delivery Method */}
      <div className="px-4 mb-8">
        <h3 className="font-black text-base text-slate-900 mb-4 flex items-center gap-2 tracking-tight">
          <Truck size={18} className="text-primary" />
          Delivery Method
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {DELIVERY_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => setDeliveryOption(option)}
              className={`flex flex-col items-start p-4 rounded-2xl border transition-all ${
                deliveryOption.id === option.id
                  ? 'bg-primary border-primary text-white shadow-lg scale-[1.02]'
                  : 'bg-white border-slate-100 text-slate-900 hover:border-slate-200'
              }`}
            >
              <span className="font-black text-xs mb-0.5">{option.name}</span>
              <span className={`text-[10px] font-medium ${deliveryOption.id === option.id ? 'text-white/80' : 'text-slate-400'}`}>
                {option.id === 'standard' ? '3-5 days' : '1-2 days'}
              </span>
              <span className="font-black text-xs mt-2">${option.price.toFixed(2)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="px-4 mb-8">
        <h3 className="font-black text-base text-slate-900 mb-4 flex items-center gap-2 tracking-tight">
          <CreditCard size={18} className="text-primary" />
          Payment Method
        </h3>
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3 group active:bg-slate-100 transition-colors">
          <div className="w-10 h-6 bg-slate-900 rounded flex items-center justify-center">
            <span className="text-[8px] text-white font-black italic">VISA</span>
          </div>
          <div className="flex-1">
            <p className="text-xs font-black text-slate-900">•••• •••• •••• 4242</p>
          </div>
          <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Promo Code */}
      <div className="px-4 mb-8">
        <h3 className="font-black text-base text-slate-900 mb-4 flex items-center gap-2 tracking-tight">
          <Ticket size={18} className="text-primary" />
          Promo Code
        </h3>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Enter code..." 
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-xs font-bold outline-none focus:border-primary transition-colors"
          />
          <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-xs font-black active:scale-95 transition-all">
            Apply
          </button>
        </div>
      </div>

      {/* Checkout Summary */}
      <div className="fixed bottom-20 left-0 right-0 px-4 z-40">
        <div className="bg-white rounded-3xl p-5 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] border border-slate-100">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-xs font-medium">Subtotal</span>
              <span className="text-slate-900 text-xs font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-xs font-medium">Delivery Fee</span>
              <span className="text-slate-900 text-xs font-bold">${deliveryOption.price.toFixed(2)}</span>
            </div>
            <div className="h-px bg-slate-100 my-2" />
            <div className="flex justify-between items-center">
              <span className="text-slate-900 text-sm font-black">Total Amount</span>
              <span className="text-primary text-xl font-black">${total.toFixed(2)}</span>
            </div>
          </div>
          <button 
            onClick={handlePlaceOrder}
            className="w-full bg-primary text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/20 active:scale-[0.98] transition-all text-sm uppercase tracking-widest"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};
