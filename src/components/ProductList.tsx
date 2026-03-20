import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, Plus, LayoutGrid, List, Star, Heart, ArrowUpDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products, filterCategories } from '../constants';

interface ProductListProps {
  onProductClick: (product: any) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ onProductClick }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') {
        return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
      }
      if (sortBy === 'price-high') {
        return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  return (
    <div className="h-full w-full bg-white overflow-y-auto pb-32 no-scrollbar">
      {/* Search Header */}
      <div className="px-4 pt-6 mb-4">
        <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-2.5 border border-slate-100 shadow-sm">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm w-full text-slate-900 placeholder:text-slate-400"
          />
          <SlidersHorizontal size={16} className="text-slate-400" />
        </div>
      </div>

      {/* View Toggle & Filters */}
      <div className="px-4 mb-4 flex items-center justify-between">
        <div className="flex gap-4 overflow-x-auto no-scrollbar flex-1 mr-4">
          {filterCategories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)}
              className={`text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat ? 'text-primary border-b-2 border-primary pb-1' : 'text-slate-400 pb-1'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 pr-8 text-xs font-bold text-slate-600 outline-none focus:border-primary transition-all"
            >
              <option value="default">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="name">Name: A-Z</option>
            </select>
            <ArrowUpDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}
            >
              <LayoutGrid size={16} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Product Display */}
      <div className={`px-4 ${viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'flex flex-col gap-3'}`}>
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <motion.div 
                layout
                key={product.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onProductClick(product)}
                className={`rounded-2xl ${product.color} border border-slate-100 shadow-sm relative group overflow-hidden cursor-pointer ${
                  viewMode === 'grid' ? 'p-3 flex flex-col gap-2' : 'p-2 flex items-center gap-3'
                }`}
              >
                {/* Image Container */}
                <div className={`relative bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center ${
                  viewMode === 'grid' ? 'w-full aspect-square' : 'w-20 h-20 flex-shrink-0'
                }`}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Discount Badge */}
                  <div className="absolute top-2 left-2 bg-pink-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-md shadow-sm uppercase tracking-tighter">
                    20% OFF
                  </div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.name);
                    }}
                    className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-all active:scale-90 ${
                      isInWishlist(product.name) 
                        ? 'bg-red-500 text-white shadow-lg' 
                        : 'bg-white/90 text-slate-400 hover:text-red-500 shadow-sm'
                    }`}
                  >
                    <Heart size={12} fill={isInWishlist(product.name) ? "currentColor" : "none"} />
                  </button>
                </div>

                {/* Content Container */}
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex flex-col mb-1">
                    <h4 className="font-bold text-sm text-slate-900 truncate">{product.name}</h4>
                    <div className="flex items-center gap-1 mt-0.5">
                      <div className="flex items-center text-yellow-500">
                        <Star size={10} fill="currentColor" />
                        <span className="text-[10px] font-bold ml-0.5">{product.rating}</span>
                      </div>
                      <span className="text-[9px] text-slate-400 font-medium">({product.reviewCount})</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold mt-0.5">{product.weight || "1 kg"}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex flex-col">
                      <span className="font-black text-sm text-slate-900">{product.price}</span>
                      <span className="text-[10px] text-slate-300 line-through font-bold">₹42</span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg active:scale-90 transition-all"
                    >
                      <Plus size={18} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-2 py-20 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <Search size={24} className="text-slate-300" />
              </div>
              <h3 className="text-slate-900 font-bold mb-1">No products found</h3>
              <p className="text-slate-400 text-xs">Try searching for something else</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
