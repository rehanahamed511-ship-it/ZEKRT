import React from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';
import { Heart, ShoppingBag, Plus, Trash2 } from 'lucide-react';

import { products } from '../constants';

interface WishlistProps {
  onProductClick: (product: any) => void;
}

export const Wishlist: React.FC<WishlistProps> = ({ onProductClick }) => {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  const wishlistItems = products.filter(p => wishlist.includes(p.name));

  if (wishlistItems.length === 0) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center bg-white px-8 text-center">
        <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mb-6">
          <Heart size={40} className="text-red-200" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Your wishlist is empty</h2>
        <p className="text-sm text-slate-400">Save your favorite items to buy them later.</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-white overflow-y-auto pb-32 no-scrollbar">
      <div className="px-4 pt-8 mb-6">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">My Wishlist</h1>
        <p className="text-sm text-slate-400 font-medium">{wishlistItems.length} items saved</p>
      </div>

      <div className="px-4 grid grid-cols-2 gap-4">
        {wishlistItems.map((product) => (
          <motion.div 
            layout
            key={product.name}
            onClick={() => onProductClick(product)}
            className="bg-white rounded-2xl border border-slate-100 p-3 shadow-sm relative cursor-pointer"
          >
            <div className="aspect-square rounded-xl bg-slate-50 mb-3 relative overflow-hidden">
               <img 
                alt={product.name} 
                className="w-full h-full object-cover" 
                src={product.image}
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product.name);
                }}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white shadow-lg active:scale-90 transition-all"
              >
                <Trash2 size={12} />
              </button>
            </div>
            <h4 className="text-sm font-bold text-slate-900 truncate mb-1">{product.name}</h4>
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-primary">{product.price}</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="w-8 h-8 rounded-xl bg-primary text-white font-bold flex items-center justify-center shadow-md active:scale-90 transition-all"
              >
                <Plus size={18} strokeWidth={3} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
