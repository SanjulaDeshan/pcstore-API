'use client';

import { useCartStore } from '@/store/useCartStore';
import { ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';

interface Props {
  item: {
    id: string;
    name: string;
    price: number | string;
    imageUrl?: string;
  }
}

export default function AddToCartButton({ item }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);

  // Parse price string (e.g. "12,500.00") to number
  const parsedPrice = typeof item.price === 'string' 
    ? parseFloat(item.price.replace(/,/g, '').trim()) 
    : item.price;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating if wrapped in a Link
    addToCart({
      id: item.id,
      name: item.name,
      price: isNaN(parsedPrice) ? 0 : parsedPrice,
      imageUrl: item.imageUrl
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button 
      onClick={handleAdd}
      disabled={added}
      className={`w-full py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all ${
        added 
          ? 'bg-green-500 text-black' 
          : 'bg-white/10 text-white hover:bg-nanotek-yellow hover:text-black hover:scale-[1.02]'
      }`}
    >
      {added ? (
        <>
          <Check size={16} /> Added to Quote
        </>
      ) : (
        <>
          <ShoppingCart size={16} /> Add to Quote
        </>
      )}
    </button>
  );
}
