// src/app/(admin)/layout.tsx
import Link from 'next/link';
import { LayoutDashboard, Tags, ListTree, Package, LogOut } from 'lucide-react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function logoutAction() {
  'use server';
  (await cookies()).delete('admin_token');
  redirect('/admin/login');
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col z-20 shadow-2xl shadow-black">
        <div className="p-6 pb-2">
          <h1 className="text-2xl font-black italic tracking-tighter">
            NANO<span className="text-nanotek-yellow">ADMIN</span>
          </h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-8">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-colors group">
            <LayoutDashboard size={20} className="group-hover:text-nanotek-yellow transition-colors" />
            <span className="font-bold text-sm uppercase tracking-wider">Dashboard</span>
          </Link>
          <Link href="/admin/dashboard/brands" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-colors group">
            <Tags size={20} className="group-hover:text-nanotek-yellow transition-colors" />
            <span className="font-bold text-sm uppercase tracking-wider">Brands</span>
          </Link>
          <Link href="/admin/dashboard/categories" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-colors group">
            <ListTree size={20} className="group-hover:text-nanotek-yellow transition-colors" />
            <span className="font-bold text-sm uppercase tracking-wider">Categories</span>
          </Link>
          <Link href="/admin/dashboard/items" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-colors group">
            <Package size={20} className="group-hover:text-nanotek-yellow transition-colors" />
            <span className="font-bold text-sm uppercase tracking-wider">Items</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/5">
          <form action={logoutAction}>
            <button type="submit" className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors">
              <LogOut size={20} />
              <span className="font-bold text-sm uppercase tracking-wider">Logout</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative bg-[#111111]">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-nanotek-yellow/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 p-10 min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
