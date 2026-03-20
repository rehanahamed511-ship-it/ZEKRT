import React from 'react';
import { Home, LayoutGrid, Search, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const { cart, wishlist } = useCart();
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'categories', icon: LayoutGrid, label: 'Categories' },
    { id: 'wishlist', icon: Heart, label: 'Wishlist' },
    { id: 'cart', icon: ShoppingCart, label: 'Cart' },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 py-2 pb-4 flex justify-between items-center z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-0.5 transition-all relative ${
              isActive ? 'text-primary' : 'text-slate-400'
            }`}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} fill={isActive ? "currentColor" : "none"} className={isActive ? 'drop-shadow-sm' : ''} />
            <span className={`text-[9px] ${isActive ? 'font-bold' : 'font-medium'}`}>{tab.label}</span>
            {tab.id === 'cart' && cart.length > 0 && (
              <div className="absolute -top-1 -right-1 size-3.5 bg-secondary text-white text-[7px] font-black rounded-full flex items-center justify-center border border-white shadow-sm">
                {cart.length}
              </div>
            )}
            {tab.id === 'wishlist' && wishlist.length > 0 && (
              <div className="absolute -top-1 -right-1 size-3.5 bg-red-500 text-white text-[7px] font-black rounded-full flex items-center justify-center border border-white shadow-sm">
                {wishlist.length}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};
