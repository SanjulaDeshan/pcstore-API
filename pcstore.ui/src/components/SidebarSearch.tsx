// src/components/SidebarSearch.tsx
'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState } from 'react';

export default function SidebarSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [query, setQuery] = useState(searchParams.get('search') || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query) params.set('search', query);
    else params.delete('search');
    params.set('pageNumber', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative group">
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search lineup..."
        className="w-full h-12 bg-[#1a1a1a] border border-white/5 rounded-xl px-4 text-xs font-bold text-white placeholder-gray-600 focus:outline-none focus:border-nanotek-yellow/50 transition-all"
      />
      <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 group-hover:text-nanotek-yellow transition-colors">
        🔍
      </button>
    </form>
  );
}