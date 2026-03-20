import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface DeliveryOption {
  id: string;
  name: string;
  price: number;
}

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  { id: 'standard', name: 'Standard Delivery', price: 5.00 },
  { id: 'express', name: 'Express Delivery', price: 15.00 },
];

interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (item: any, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  toggleWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  total: number;
  deliveryOption: DeliveryOption;
  setDeliveryOption: (option: DeliveryOption) => void;
  subtotal: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>(DELIVERY_OPTIONS[0]);

  const addToCart = (product: any, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.name);
      if (existing) {
        return prev.map(item => 
          item.id === product.name ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { 
        id: product.name, 
        name: product.name, 
        price: parseFloat(product.price.toString().replace(/[^\d.]/g, '')), 
        quantity: quantity,
        image: product.image || 'https://picsum.photos/seed/grocery/200/200'
      }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isInWishlist = (id: string) => wishlist.includes(id);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + deliveryOption.price;

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ 
      cart, 
      wishlist,
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      toggleWishlist,
      isInWishlist,
      total, 
      subtotal,
      deliveryOption, 
      setDeliveryOption,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
