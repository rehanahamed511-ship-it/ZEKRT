import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Star, Clock, Info, ShieldCheck, ShoppingCart, Heart, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

import { products } from '../constants';

interface ProductDetailProps {
  product: any;
  onBack: () => void;
  onProductClick: (product: any) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onProductClick }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);

  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => Math.max(1, prev - 1));

  const relatedProducts = products
    .filter(p => p.category === product.category && p.name !== product.name)
    .slice(0, 4);

  const details = {
    description: product.description || "Freshly sourced and carefully selected for the highest quality. Our products are delivered straight from local farms to ensure maximum freshness and nutritional value.",
    nutrition: product.nutrition || [
      { label: "Calories", value: "45 kcal" },
      { label: "Carbs", value: "10g" },
      { label: "Protein", value: "1.2g" },
      { label: "Fat", value: "0.2g" }
    ],
    origin: product.origin || "Local Farms, India",
    shelfLife: product.shelfLife || "3-5 Days"
  };

  return (
    <div className="h-full w-full bg-white overflow-y-auto no-scrollbar pb-32">
      {/* Header */}
      <div className="relative h-72 bg-slate-50">
        <div className="absolute top-6 left-4 right-4 flex justify-between items-center z-10">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-sm active:scale-90 transition-all"
          >
            <ChevronLeft size={24} className="text-slate-900" />
          </button>
          <button 
            onClick={() => toggleWishlist(product.name)}
            className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center shadow-sm active:scale-90 transition-all ${
              isInWishlist(product.name) ? 'bg-red-500 text-white' : 'bg-white/80 text-slate-400'
            }`}
          >
            <Heart size={20} fill={isInWishlist(product.name) ? "currentColor" : "none"} />
          </button>
        </div>
        <motion.img 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain p-12"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Content */}
      <div className="px-6 -mt-6 relative bg-white rounded-t-[32px] pt-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-xs font-black text-primary uppercase tracking-widest mb-1 block">
              {product.category || "Fresh Produce"}
            </span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">{product.name}</h1>
            <p className="text-sm text-slate-400 font-medium">{product.weight || "Standard Pack"}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-2xl font-black text-primary">{product.price}</span>
            <div className="flex items-center gap-1 mt-1">
              <Star size={14} className="text-yellow-500" fill="currentColor" />
              <span className="text-xs font-bold text-slate-900">{product.rating || 4.5}</span>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
            <Clock size={18} className="text-primary mb-1.5" />
            <span className="text-[10px] text-slate-400 font-bold uppercase">Shelf Life</span>
            <span className="text-xs font-black text-slate-900">{details.shelfLife}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
            <Info size={18} className="text-primary mb-1.5" />
            <span className="text-[10px] text-slate-400 font-bold uppercase">Origin</span>
            <span className="text-xs font-black text-slate-900 truncate w-full">{details.origin}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
            <ShieldCheck size={18} className="text-primary mb-1.5" />
            <span className="text-[10px] text-slate-400 font-bold uppercase">Quality</span>
            <span className="text-xs font-black text-slate-900">Certified</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h3 className="text-base font-black text-slate-900 mb-3 tracking-tight">Description</h3>
          <p className="text-sm text-slate-500 leading-relaxed font-medium">
            {details.description}
          </p>
        </div>

        {/* Nutritional Info */}
        <div className="mb-8">
          <h3 className="text-base font-black text-slate-900 mb-4 tracking-tight">Nutritional Information</h3>
          <div className="grid grid-cols-2 gap-4">
            {details.nutrition.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">{item.label}</span>
                <span className="text-sm font-black text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <h3 className="text-base font-black text-slate-900 mb-4 tracking-tight">Related Products</h3>
            <div className="flex overflow-x-auto gap-4 no-scrollbar pb-4">
              {relatedProducts.map((p) => (
                <div 
                  key={p.name} 
                  onClick={() => onProductClick(p)}
                  className="flex-none w-44 bg-slate-50 rounded-2xl border border-slate-100 p-3 shadow-sm cursor-pointer"
                >
                  <div className="aspect-square rounded-xl bg-white mb-2 overflow-hidden">
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 truncate mb-1">{p.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-primary">{p.price}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(p);
                      }}
                      className="w-6 h-6 rounded-lg bg-primary text-white flex items-center justify-center shadow-sm active:scale-90 transition-all"
                    >
                      <Plus size={14} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add to Cart Button */}
      <div className="fixed bottom-24 left-0 right-0 px-6 z-40 flex gap-4 bg-white/80 backdrop-blur-md py-4 border-t border-slate-100">
        <div className="flex items-center bg-slate-100 rounded-2xl p-1 h-14">
          <button 
            onClick={handleDecrement}
            className="w-10 h-10 flex items-center justify-center text-slate-500 active:scale-90 transition-all"
          >
            <Minus size={18} />
          </button>
          <span className="w-8 text-center font-black text-slate-900">{quantity}</span>
          <button 
            onClick={handleIncrement}
            className="w-10 h-10 flex items-center justify-center text-slate-500 active:scale-90 transition-all"
          >
            <Plus size={18} />
          </button>
        </div>
        <button 
          onClick={handleAddToCart}
          className={`flex-1 font-black h-14 rounded-2xl shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-sm uppercase tracking-widest ${
            isAdded ? 'bg-green-500 text-white shadow-green-500/20' : 'bg-primary text-white shadow-primary/20'
          }`}
        >
          {isAdded ? (
            <>
              <ShieldCheck size={20} />
              Added!
            </>
          ) : (
            <>
              <ShoppingCart size={20} />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};
