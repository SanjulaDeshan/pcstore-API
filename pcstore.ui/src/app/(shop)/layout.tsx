// src/app/(shop)/layout.tsx

import Link from "next/link";
import Image from "next/image";

async function getCategories() {
  const res = await fetch("https://localhost:7297/api/Category", { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories();

  return (
    <div className="flex min-h-screen bg-nanotek-black selection:bg-nanotek-yellow selection:text-black">
      {/* Sidebar */}
      <aside className="w-80 hidden lg:block sticky top-0 h-screen bg-nanotek-black border-r border-white/5 p-6 overflow-y-auto">
        <div className="mb-10">
          <Link href="/">
            <span className="text-4xl font-black italic tracking-tighter text-white">
              NANO<span className="text-nanotek-yellow">TEK</span>
            </span>
          </Link>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-4">Hardware Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat: any) => (
                <li key={cat.id}>
                  <Link 
                    href={`/category/${cat.id}`} 
                    className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all duration-300"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-nanotek-yellow transition-colors" />
                    <span className="text-sm font-semibold text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-transform">
                      {cat.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      <main className="flex-1">
        {/* Transparent Glass Header */}
        <header className="h-20 glass-card sticky top-0 z-50 flex items-center justify-between px-10">
          <div className="flex gap-8">
            <Link href="/" className="text-xs font-bold uppercase tracking-widest hover:text-nanotek-yellow transition-colors">Shop</Link>
            <Link href="/services" className="text-xs font-bold uppercase tracking-widest hover:text-nanotek-yellow transition-colors">Services</Link>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-xs font-bold text-gray-400">0777 292 272</span>
            <div className="h-10 px-6 rounded-full bg-nanotek-yellow text-black flex items-center gap-2 font-black text-sm cursor-pointer hover:scale-105 transition-transform">
              🛒 <span className="hidden sm:inline">0 LKR</span>
            </div>
          </div>
        </header>

        <div className="p-10">{children}</div>
      </main>
    </div>
  );
}