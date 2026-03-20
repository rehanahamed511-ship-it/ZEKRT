import { useState } from 'react';
import { Home as HomeIcon, LayoutGrid } from 'lucide-react';
import { Home } from './components/Home';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { Wishlist } from './components/Wishlist';
import { ProductDetail } from './components/ProductDetail';
import { BottomNav } from './components/BottomNav';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './components/Login';
import { motion, AnimatePresence } from 'motion/react';

type Screen = 'home' | 'categories' | 'search' | 'cart' | 'wishlist' | 'product-detail';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  if (loading) {
    return (
      <div className="h-dvh w-full flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const renderContent = () => {
    if (!user) return <Login />;
    return renderScreen();
  };

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setCurrentScreen('product-detail');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <Home 
            onSearchClick={() => { setCurrentScreen('search'); setActiveTab('search'); }} 
            onProductClick={handleProductClick}
          />
        );
      case 'search':
        return <ProductList onProductClick={handleProductClick} />;
      case 'cart':
        return <Cart />;
      case 'wishlist':
        return <Wishlist onProductClick={handleProductClick} />;
      case 'product-detail':
        return <ProductDetail product={selectedProduct} onBack={() => setCurrentScreen('home')} onProductClick={handleProductClick} />;
      case 'categories':
        return (
          <div className="h-full w-full flex flex-col items-center justify-center bg-white p-8 text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 shadow-inner">
              <LayoutGrid size={48} className="text-primary drop-shadow-sm" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Categories</h2>
            <p className="text-slate-400 text-sm max-w-[240px]">Explore our wide range of fresh products by category.</p>
            <button className="mt-8 bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20">Browse All</button>
          </div>
        );
      default:
        return (
          <div className="h-full w-full flex items-center justify-center bg-slate-50">
            <p className="text-slate-400 font-medium capitalize">{currentScreen} Screen Coming Soon</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-md h-dvh bg-white sm:shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative overflow-hidden font-sans sm:rounded-[40px] sm:border-[8px] sm:border-slate-900 sm:my-8 sm:h-[844px] flex flex-col sm:pt-6">
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={user ? currentScreen : 'login'}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {user && (
        <BottomNav 
          activeTab={activeTab} 
          onTabChange={(tab) => {
            setActiveTab(tab);
            setCurrentScreen(tab as Screen);
          }} 
        />
      )}
      
      {/* Mobile Notch/Home Indicator Simulation for Desktop */}
      <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-[100]" />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
