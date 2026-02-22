// src/app/(shop)/layout.tsx

'use client'; // Interactivity (useState) පාවිච්චි කරන නිසා

import Link from "next/link";
import { useState, useEffect } from "react";

// Server Component එකේ තිබුණු fetch එක Client එකේ පාවිච්චි කරන විදිහට වෙනස් කරමු
async function getCategories() {
  const res = await fetch("https://localhost:7297/api/Category", { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<any[]>([]);
  const [isNavOpen, setIsNavOpen] = useState(false); // Navbar menu එකට
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Category sidebar එකට

  useEffect(() => {
    getCategories().then(data => setCategories(data));
  }, []);

  return (
    <div className="flex min-h-screen bg-nanotek-black selection:bg-nanotek-yellow selection:text-black">
      
      {/* 1. Mobile Sidebar Overlay (Sidebar එක ඇරල තියෙද්දි background එක අඳුරු කරන්න) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 2. Responsive Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-80 bg-nanotek-black border-r border-white/5 p-6 overflow-y-auto z-[70]
        transition-transform duration-300 lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex justify-between items-center mb-10">
          <Link href="/" onClick={() => setIsSidebarOpen(false)}>
            <span className="text-4xl font-black italic tracking-tighter text-white">
              NANO<span className="text-nanotek-yellow">TEK</span>
            </span>
          </Link>
          {/* Mobile Close Button */}
          <button className="lg:hidden text-white text-2xl" onClick={() => setIsSidebarOpen(false)}>✕</button>
        </div>

        <div className="space-y-6">
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-4">Hardware Categories</h3>
          <ul className="space-y-2">
            {categories.map((cat: any) => (
              <li key={cat.id}>
                <Link 
                  href={`/category/${cat.id}`} 
                  onClick={() => setIsSidebarOpen(false)}
                  className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-nanotek-yellow transition-colors" />
                  <span className="text-sm font-semibold text-gray-400 group-hover:text-white transition-transform">
                    {cat.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        {/* 3. Improved Responsive Header */}
        <header className="h-20 glass-card sticky top-0 z-50 flex items-center justify-between px-6 lg:px-10">
          
          <div className="flex items-center gap-4">
            {/* Mobile Category Toggle Button */}
            <button 
              className="lg:hidden p-2 bg-white/5 rounded-lg border border-white/10"
              onClick={() => setIsSidebarOpen(true)}
            >
              <span className="text-[10px] font-black text-nanotek-yellow uppercase">Categories</span>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex gap-8">
              <Link href="/" className="text-xs font-bold uppercase tracking-widest hover:text-nanotek-yellow transition-colors">Shop</Link>
              <Link href="/services" className="text-xs font-bold uppercase tracking-widest hover:text-nanotek-yellow transition-colors">Services</Link>
              <Link href="/about" className="text-xs font-bold uppercase tracking-widest hover:text-nanotek-yellow transition-colors">About</Link>
              <Link href="/contact" className="text-xs font-bold uppercase tracking-widest hover:text-nanotek-yellow transition-colors">Contact</Link>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            {/* Mobile Hamburger for Main Nav */}
            <button 
              className="lg:hidden p-2 text-white" 
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              {isNavOpen ? '✕' : '☰'}
            </button>

            <span className="hidden sm:inline text-xs font-bold text-gray-400">0777 292 272</span>
            
            <div className="h-10 px-4 lg:px-6 rounded-full bg-nanotek-yellow text-black flex items-center gap-2 font-black text-xs lg:text-sm cursor-pointer hover:scale-105 transition-transform">
              🛒 <span className="hidden xs:inline">0 LKR</span>
            </div>
          </div>

          {/* 4. Mobile Main Navigation Dropdown */}
          {isNavOpen && (
            <div className="absolute top-20 left-0 w-full bg-nanotek-black border-b border-white/5 p-6 flex flex-col gap-4 lg:hidden animate-in slide-in-from-top duration-300">
              <Link href="/" onClick={() => setIsNavOpen(false)} className="text-sm font-bold uppercase text-gray-400 hover:text-nanotek-yellow">Shop</Link>
              <Link href="/services" onClick={() => setIsNavOpen(false)} className="text-sm font-bold uppercase text-gray-400 hover:text-nanotek-yellow">Services</Link>
              <Link href="/about" onClick={() => setIsNavOpen(false)} className="text-sm font-bold uppercase text-gray-400 hover:text-nanotek-yellow">About</Link>
              <Link href="/contact" onClick={() => setIsNavOpen(false)} className="text-sm font-bold uppercase text-gray-400 hover:text-nanotek-yellow">Contact</Link>
              <span className="sm:hidden text-xs font-bold text-gray-500 pt-4 border-t border-white/5">0777 292 272</span>
            </div>
          )}
        </header>

        <div className="p-4 lg:p-10">{children}</div>
      </main>
    </div>
  );
}