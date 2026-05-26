'use client';

import Link from 'next/link';
import { LayoutDashboard, Tags, ListTree, Package, LogOut, Megaphone, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { logoutAdmin } from '@/app/actions/auth';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-[#0a0a0a] p-4 border-b border-white/5 absolute w-full top-0 z-30">
        <h1 className="text-xl font-black italic tracking-tighter text-white">
          NANO<span className="text-nanotek-yellow">ADMIN</span>
        </h1>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:relative top-0 left-0 h-full w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col z-50 shadow-2xl shadow-black
        transition-transform duration-300 ease-in-out md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 pb-2 hidden md:block">
          <h1 className="text-2xl font-black italic tracking-tighter text-white">
            NANO<span className="text-nanotek-yellow">ADMIN</span>
          </h1>
        </div>
        
        {/* Mobile Header (inside sidebar) */}
        <div className="p-6 pb-2 flex md:hidden items-center justify-between">
          <h1 className="text-2xl font-black italic tracking-tighter text-white">
            NANO<span className="text-nanotek-yellow">ADMIN</span>
          </h1>
          <button onClick={closeSidebar} className="text-white">
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-8 overflow-y-auto">
          <Link href="/admin/dashboard" onClick={closeSidebar} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${pathname === '/admin/dashboard' ? 'bg-white/10 text-nanotek-yellow' : 'hover:bg-white/5 text-gray-300 hover:text-white'}`}>
            <LayoutDashboard size={20} className={pathname === '/admin/dashboard' ? 'text-nanotek-yellow' : 'group-hover:text-nanotek-yellow transition-colors'} />
            <span className="font-bold text-sm uppercase tracking-wider">Dashboard</span>
          </Link>
          <Link href="/admin/dashboard/ads" onClick={closeSidebar} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${pathname === '/admin/dashboard/ads' ? 'bg-white/10 text-nanotek-yellow' : 'hover:bg-white/5 text-gray-300 hover:text-white'}`}>
            <Megaphone size={20} className={pathname === '/admin/dashboard/ads' ? 'text-nanotek-yellow' : 'group-hover:text-nanotek-yellow transition-colors'} />
            <span className="font-bold text-sm uppercase tracking-wider">Advertisements</span>
          </Link>
          <Link href="/admin/dashboard/brands" onClick={closeSidebar} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${pathname === '/admin/dashboard/brands' ? 'bg-white/10 text-nanotek-yellow' : 'hover:bg-white/5 text-gray-300 hover:text-white'}`}>
            <Tags size={20} className={pathname === '/admin/dashboard/brands' ? 'text-nanotek-yellow' : 'group-hover:text-nanotek-yellow transition-colors'} />
            <span className="font-bold text-sm uppercase tracking-wider">Brands</span>
          </Link>
          <Link href="/admin/dashboard/categories" onClick={closeSidebar} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${pathname === '/admin/dashboard/categories' ? 'bg-white/10 text-nanotek-yellow' : 'hover:bg-white/5 text-gray-300 hover:text-white'}`}>
            <ListTree size={20} className={pathname === '/admin/dashboard/categories' ? 'text-nanotek-yellow' : 'group-hover:text-nanotek-yellow transition-colors'} />
            <span className="font-bold text-sm uppercase tracking-wider">Categories</span>
          </Link>
          <Link href="/admin/dashboard/items" onClick={closeSidebar} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${pathname.startsWith('/admin/dashboard/items') ? 'bg-white/10 text-nanotek-yellow' : 'hover:bg-white/5 text-gray-300 hover:text-white'}`}>
            <Package size={20} className={pathname.startsWith('/admin/dashboard/items') ? 'text-nanotek-yellow' : 'group-hover:text-nanotek-yellow transition-colors'} />
            <span className="font-bold text-sm uppercase tracking-wider">Items</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/5 mt-auto">
          <form action={logoutAdmin}>
            <button type="submit" className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors">
              <LogOut size={20} />
              <span className="font-bold text-sm uppercase tracking-wider">Logout</span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
