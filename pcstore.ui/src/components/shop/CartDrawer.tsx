'use client';

import { useCartStore } from '@/store/useCartStore';
import { generateQuotePDF } from '@/lib/generateQuotePDF';
import { ShoppingCart, X, Plus, Minus, Download, Trash2 } from 'lucide-react';
import Image from 'next/image';

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCartStore();

  const handleDownloadPDF = () => {
    generateQuotePDF(items, getTotalPrice());
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={`
        fixed top-0 right-0 h-screen w-full sm:w-[450px] bg-[#0a0a0a] border-l border-white/10 z-[90] flex flex-col shadow-2xl
        transition-transform duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-xl font-black italic uppercase tracking-widest text-white flex items-center gap-3">
            <ShoppingCart size={24} className="text-nanotek-yellow" /> Your Quote
            <span className="bg-white/10 text-white text-xs px-2 py-1 rounded-full not-italic">
              {getTotalItems()}
            </span>
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white transition-colors bg-white/5 rounded-full">
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <ShoppingCart size={48} className="text-gray-500" />
              <p className="font-bold text-gray-400">Your quotation list is empty.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-[#111111] border border-white/5 p-3 rounded-2xl relative group">
                {/* Remove Button */}
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <Trash2 size={12} />
                </button>

                <div className="w-20 h-20 bg-black rounded-xl overflow-hidden relative border border-white/10 flex-shrink-0">
                  {item.imageUrl ? (
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[8px] text-gray-500 uppercase font-bold text-center">No Image</div>
                  )}
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-1">
                  <h3 className="font-bold text-sm text-gray-200 line-clamp-2 leading-tight">{item.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-black text-nanotek-yellow text-sm">
                      LKR {item.price.toLocaleString()}
                    </span>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 bg-black rounded-lg p-1 border border-white/10">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center bg-white/5 hover:bg-white/20 rounded-md text-white transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-bold text-white w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center bg-white/5 hover:bg-white/20 rounded-md text-white transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="p-6 bg-[#111111] border-t border-white/5 space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Grand Total</span>
              <span className="text-2xl font-black italic text-white">
                LKR {getTotalPrice().toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
            
            <button 
              onClick={handleDownloadPDF}
              className="w-full bg-nanotek-yellow text-black h-14 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(255,215,0,0.2)]"
            >
              <Download size={20} /> Download PDF Quote
            </button>
          </div>
        )}
      </div>
    </>
  );
}
