'use client';

import { useCartStore } from '@/store/useCartStore';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import CartDrawer from './CartDrawer';

export default function CartIcon() {
  const [mounted, setMounted] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { getTotalPrice, getTotalItems } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 px-4 lg:px-6 rounded-full bg-nanotek-yellow/50 text-black/50 flex items-center gap-2 font-black text-xs lg:text-sm">
        <ShoppingCart size={16} /> <span className="hidden xs:inline">--- LKR</span>
      </div>
    );
  }

  return (
    <>
      <button 
        onClick={() => setIsDrawerOpen(true)}
        className="h-10 px-4 lg:px-6 rounded-full bg-nanotek-yellow text-black flex items-center gap-2 font-black text-xs lg:text-sm cursor-pointer hover:scale-105 transition-transform"
      >
        <div className="relative">
          <ShoppingCart size={16} />
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full border border-black">
              {getTotalItems()}
            </span>
          )}
        </div>
        <span className="hidden xs:inline">{getTotalPrice().toLocaleString()} LKR</span>
      </button>

      <CartDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}
