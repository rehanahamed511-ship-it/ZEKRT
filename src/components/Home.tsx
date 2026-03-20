import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, User, ChevronRight, Plus, Star, Heart, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface HomeProps {
  onSearchClick: () => void;
  onProductClick: (product: any) => void;
}

const heroImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC64rqVLL0zxN5myMx0s59TuSR9ktrX60mIPLK1yjgmzSKuwozguCBkgHpxG0CLKze00KBQW8iIESkd8pz-GmGB7XRKnLIvHf6ma-8bCoz1ynB4CNBvoju9oK17iWjUS27ku969vOX4k1LJa9i1ypB4Y2Nxeu5ZMHbAK9au_pzHilQrHupGvgi3VbTnsUXqAJlnyTb32eqYdtdciIr7g0cBtp94wAm5PFkHmPtPcv061IS51AAI2VvSIjWIK1IowQbQ7bYae3dmiIc',
  'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800&h=400',
  'https://images.unsplash.com/photo-1506617564039-2f3b650ad701?auto=format&fit=crop&q=80&w=800&h=400',
  'https://images.unsplash.com/photo-1543083477-4f785aeafaa9?auto=format&fit=crop&q=80&w=800&h=400'
];

const categories = [
  { name: 'Vegetables & Fruits', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpr_mXm_i7Nr3g2XpjrUAR1nfZQP3hXFHtFRuDYlQq-H8HLlJjKbyrUMSbqFdPe2V99C9k9p9gikm78s4u0nKgw4HUWF5Dgunxw5mUZKVjqdw_w3d3WOYchHfEcPNi_WAiS_nKR4onDRPuzTnr4ebrxkmqvXW4IJm_qRvc_jVJx9n7GQB4jk4P2P_oRLwjeUEGSf-F9ainzklME1Vp0v0oOb2SaEul-l6eFkSRMOJwdNgGr8eyVPpM8EzvccLz_VTyu6N1nbzifBY', color: 'bg-orange-100' },
  { name: 'Dairy & Eggs', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUxgwrpgoLNd0lYM-ucacPVTCsFF6F8Gc50llfztwjDSusZhZ4FilVfbHuaxqEZHmkHg65DPYhe9OcabDNVZ9_XxZCFjl5XI9wMw67qUNsZYjurR1WRgI7PRIeR8mFi_R-9iHvY--GanP01uEByt2WZzFmzPwH_tRDDmBnmmJgQOo62Xgnv3XqC37JGdXdxJPM-Df4euecyIe6tAL0ffcRoLEG0MgQZIcGr9Z1SAHAlc3To404HnX2PN-ONg3MEpAVlkMNl7kXORQ', color: 'bg-slate-50' },
  { name: 'Snacks', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmmtOHsEirhv8CKaqLAysAztXuM6B-ZDmfcK16CANnZIw5h4eRqe03UcoCLHHpMQG9uCvnC9SGk4_z2vSju6Us6TNqa7IAlIuFjyLHHyniEnPe59l6B5E4GZ8uqhw7urB21p8zq-uFk3yI92Ow2WzFhO38gxHA8cAQXyXFlwG4sXgwtbEy3u7Bh7mi0Mk3ADZ4ooFa7Wd30qf5h9IGryXu-5Mf4kk7ZgJxHq9f_b7ASHkHNU3OUK03QGzf44yeRgfcBNWjUkXUkyM', color: 'bg-yellow-100' },
  { name: 'Meat & Fish', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAwd3en0Q4BvIqT6rk8gD5i6_SUjf40uY6qeaKTsOgaqBheXscFy1GRfho1MfXOjmPYt-2RP9pujk2ROLM8VobSPA3GG5X2WD-8GfCVVkJJ6QFHPyh5S0n-JXw3EngYlKzQgdRxtS1obx_C0u5PlCQbGHLX0VNquLjBcKo0fMEpxcnZCzYLow4zsfANxju3V0K_4CyDRoZLQhPgE8JTiWDxOIDBlIackZsMaawmtLnplLl_oPlUZ9yQeKFkQ5hBFYaSRnSCCFGPXU', color: 'bg-red-100' },
  { name: 'Rice & Dal', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEC9GliWGxFlwSU5shLiC1g5Ee_lilBc1X9tUDn-YqPL9shlXY1SlEprybw4IPS1bmwXDfgNuW6_9y0CRSHPAuvfXunNWVNqRx6p1EK-UoR6v6Z7ao7xPm07wBNbVkRktcEphiHR6SJ-_YwDhrVkLM3aZZXLlCUemlyjtKcT1zHS-CPU6sDBLVAW1s9WSmKzMyws_TNxZvpYP4rRwQJpRelJnK0a7a2vILJpuPmWDBEgYKhLu5eUF-PR-coMUxEgJqSS9q9JiBPJI', color: 'bg-green-100' },
  { name: 'Cleaning', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpHkbcRWJer6ID5Dxd25hJx7JZwo6brLRFrtslurfMC-zCa2AmeQOQN2Ok7dAENPvJtkm45UpRPQ3vnYWOZkhN8fIGhuTm9g2gc_P6iZU2tW6FWazSnWkl352LVbas7mXWi7trGa4cXjv4dXme94DBmjHGvNBRYZnEuKP-Y-YGx6-A8iAXNevVNGd8bhgi5iK3R9aLubVt4IPqRgMw-Msw_c9xOFIYscKnBbnM1Txj9pD9_k7kuWGwQCDE2KYQo7exNsBqzW0o0Gk', color: 'bg-purple-100' },
  { name: 'Baby Care', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHNTpzsf9hIwG6eQfEtVOFpv4QvZy9x7q_djNtM7Z9_Rp2zYaYqzRGCuwlfDoPOmOZtjnrk1mobWmWnxnml3y4jDXs3T_SRTi63nGDSyzZTUQHBp7Oq7DVryac5qXsar_ZFRyiho_h990LNrqSi8AKhIuBjgazA7mcqmqyBLgkuPIllkY7jMtOfffRxBT0MMNK-6Is0De5E-2Is2CjG52w0I8zCWmbIzqqGk4ikJXhYTdt6nwQVTnSNuLwYT1jLcaZaQsqDscFBh8', color: 'bg-pink-100' },
  { name: 'Breakfast', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHB6HjMqxdlJmr0jQxF7K3hag-3OOsoecaJALKhDXjTvttBWUZz8jIITq5qj4Ow-k-7cxQUbzU4AlfW1di-Bat_syrSRXpq9degGJ8t9H4QXQd2z0OlZheozp_gM-NCMhY_iubjm5l-AxVGn86Ivc_k_dpkX8KI06BN-xFQI8LDWvG5zZgREGxD_LLXgmJAvNPPFGR8JJsU7wJ1ChSlKFicsfxck5yjq6a0REnrZujmG8hog1zg7N0UwmwG4jim4qkF0wuImCikyM', color: 'bg-teal-100' },
];

const deals = [
  { name: 'New Potato (Aloo)', weight: '1 kg', price: '₹34', oldPrice: '₹42', discount: '20% OFF', rating: 4.5, reviewCount: 128, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCO5W18-tLI8rWPb_s8RQlayYs5T15QYoTEoixPrl8k_qXd7JS_wji_mO6EXWqwOmgKtgrQLXY1gO7HUuWVClQSvPRGq4EcJ_siXatW3Kd8-HjjfK0U05RmaVKS0eRwhHwUrNaEGvS30m14GVwn408hP2ImNm-oY7Ofx1Ljm2RjsS1CXKm7OLE5uBpmMYpMSsKd5YrPfyO8UrHCoDi3NClGsDnITS0d3PV5j2GN-7C54_nxgmk4Se9e3EFbAfRqg_JtZdE3lgXfwvQ', description: 'Freshly harvested new potatoes, perfect for roasting, boiling, or making delicious curries.' },
  { name: 'Full Cream Milk', weight: '500 ml', price: '₹33', oldPrice: '₹38', discount: '15% OFF', rating: 4.8, reviewCount: 256, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxczUqXXlQVjSELRQ-yUIDoXfsrHhDmFhIGg7DYQfnNRnClK6lHkgjF-YUnnPmHaLU34amsuUyyv4MGkSrKouFG00XiSFxgDULy9MAALrbStGdslyXcsm7PgOEBINU4_48fj39LSDfkxJXoibKeW90A1b3VGp4qq3vU2QSprjAcPBriuJG5DYjMwy5Eq_ZtDMdQrnWKUSA4Sllz-wl44-r1G1uPY3LlRR7vuXGh8qEVAI4ALVeeUYVfiED1NXE_cvInB4g1KXE7AU', description: 'Rich and creamy full cream milk, pasteurized and homogenized for safety and taste.' },
  { name: 'Onion (Pyaz)', weight: '1 kg', price: '₹52', oldPrice: '₹58', discount: '10% OFF', rating: 4.2, reviewCount: 89, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAr1Imn2LKsk_nBisiUyftaqjGe0m4RoPxyhCfP6e_yD3eJ9T1DJ2KFrdZvo9bhWx9jlHA7gP6rIkJaM0gib2ikmx9kkRyBKHsNkI2GgulB9SjbuMKkEOe3QP-KshOYtRgwc3Qz3MsWRRNsMrMwvZo9b9LGyw03EdCz-QedbzUOLNkJm1Hd5rntEy-mJfKvkzOS6deDSNWMq9jNlO606RPvXPCGehmaXL_zgJl66htbh7aJnGEI-dQfsOH7IKo13680KcZaOqkABqk', description: 'Essential kitchen staple, fresh and pungent onions sourced directly from farmers.' },
  { name: 'Fresh Tomato', weight: '500 g', price: '₹25', oldPrice: '₹35', discount: '28% OFF', rating: 4.4, reviewCount: 156, image: 'https://picsum.photos/seed/tomato/400/400', description: 'Ripe and firm red tomatoes, ideal for salads, sauces, and everyday cooking.' },
  { name: 'Green Apple', weight: '4 pcs', price: '₹120', oldPrice: '₹150', discount: '20% OFF', rating: 4.7, reviewCount: 212, image: 'https://picsum.photos/seed/apple/400/400', description: 'Crisp and tart green apples, a healthy and refreshing snack option.' },
  { name: 'Farm Eggs', weight: '6 pcs', price: '₹45', oldPrice: '₹55', discount: '18% OFF', rating: 4.6, reviewCount: 342, image: 'https://picsum.photos/seed/eggs/400/400', description: 'Fresh farm eggs, high in protein and essential nutrients for a healthy breakfast.' },
];

export const Home: React.FC<HomeProps> = ({ onSearchClick, onProductClick }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { user, logout } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full w-full bg-white overflow-y-auto pb-32 no-scrollbar">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-primary to-secondary px-4 py-3 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 backdrop-blur-sm text-white p-1 rounded-lg">
              <MapPin size={16} />
            </div>
            <div>
              <h2 className="text-white text-[10px] font-bold uppercase tracking-wider">Delivery in 10 MINS</h2>
              <p className="text-white/80 text-[11px] font-medium">Sector 45, Gurgaon, HR</p>
            </div>
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden border border-white/30"
            >
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <User size={16} className="text-white" />
              )}
            </button>
            
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-[60]"
                >
                  <div className="px-3 py-2 border-b border-slate-50 mb-1">
                    <p className="text-xs font-black text-slate-900 truncate">{user?.displayName || 'User'}</p>
                    <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
                  </div>
                  <button 
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors text-xs font-bold"
                  >
                    <LogOut size={14} />
                    Log Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="relative" onClick={onSearchClick}>
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={14} className="text-slate-400" />
          </div>
          <input 
            className="w-full bg-white border-none rounded-lg py-2 pl-9 pr-4 text-xs focus:ring-1 focus:ring-primary/20 placeholder:text-slate-400 cursor-pointer shadow-inner" 
            placeholder="Search 'milk', 'bread' or 'eggs'" 
            type="text"
            readOnly
          />
        </div>
      </header>

      {/* Hero Banner */}
      <section className="p-4">
        <div className="relative w-full h-32 rounded-xl overflow-hidden bg-slate-100">
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              alt="Fresh grocery delivery promo" 
              className="absolute inset-0 w-full h-full object-cover" 
              src={heroImages[currentImageIndex]}
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent p-5 flex flex-col justify-center pointer-events-none">
            <span className="bg-white text-primary text-[8px] font-bold px-1.5 py-0.5 rounded w-fit mb-1.5 uppercase tracking-wider">Limited Offer</span>
            <h3 className="text-white text-lg font-bold leading-tight mb-0.5">UP TO 50% OFF</h3>
            <p className="text-white/90 text-[11px] font-medium">On your first 3 orders</p>
          </div>
          {/* Progress indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {heroImages.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-4 bg-white' : 'w-1 bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-900 font-black text-base tracking-tight">Shop by Category</h3>
          <button className="text-primary text-xs font-bold flex items-center gap-1">
            See all <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-y-5 gap-x-3">
          {categories.map((cat) => (
            <div key={cat.name} className="flex flex-col items-center gap-2 group">
              <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center border border-slate-100 shadow-sm group-active:scale-95 transition-transform`}>
                <img 
                  alt={cat.name} 
                  className="w-10 h-10 object-contain" 
                  src={cat.image}
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-[11px] font-bold text-center leading-tight text-slate-700">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Deals of the Day */}
      <section className="mt-8 mb-6">
        <div className="flex items-center justify-between px-4 mb-4">
          <h3 className="text-slate-900 font-black text-base tracking-tight">Deals of the Day</h3>
          <div className="bg-secondary/10 text-secondary text-[10px] font-black px-2 py-1 rounded-full animate-pulse">
            ENDS SOON
          </div>
        </div>
        <div className="flex overflow-x-auto gap-4 px-4 no-scrollbar pb-2">
          {deals.map((deal) => (
            <div 
              key={deal.name} 
              onClick={() => onProductClick(deal)}
              className="flex-none w-40 bg-white rounded-2xl border border-slate-100 p-3 shadow-sm cursor-pointer"
            >
              <div className="aspect-square rounded-xl bg-slate-50 mb-3 relative overflow-hidden">
                <img 
                  alt={deal.name} 
                  className="w-full h-full object-cover" 
                  src={deal.image}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2 bg-secondary text-white text-[9px] font-black px-2 py-1 rounded-lg shadow-md">{deal.discount}</div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(deal.name);
                  }}
                  className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-all active:scale-90 ${
                    isInWishlist(deal.name) 
                      ? 'bg-red-500 text-white shadow-lg' 
                      : 'bg-white/80 text-slate-400 hover:text-red-500'
                  }`}
                >
                  <Heart size={14} fill={isInWishlist(deal.name) ? "currentColor" : "none"} />
                </button>
              </div>
              <div className="flex flex-col mb-1">
                <h4 className="text-sm font-bold text-slate-900 truncate">{deal.name}</h4>
                <div className="flex items-center gap-1">
                  <div className="flex items-center text-yellow-500">
                    <Star size={10} fill="currentColor" />
                    <span className="text-[10px] font-bold ml-0.5">{deal.rating}</span>
                  </div>
                  <span className="text-[9px] text-slate-400 font-medium">({deal.reviewCount})</span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium">{deal.weight}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-black text-slate-900">{deal.price}</span>
                  <span className="text-[10px] text-slate-400 line-through">{deal.oldPrice}</span>
                </div>
                <button 
                  onClick={() => addToCart({ name: deal.name, price: deal.price })}
                  className="w-8 h-8 rounded-xl bg-primary text-white font-bold flex items-center justify-center shadow-md active:scale-90 transition-all"
                >
                  <Plus size={18} strokeWidth={3} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
