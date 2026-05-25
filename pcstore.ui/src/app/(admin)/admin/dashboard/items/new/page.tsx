import { authFetcher } from '@/lib/api';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import NewItemForm from './NewItemForm';

export default async function NewItemPage() {
  const brands = await authFetcher('/Brand') || [];
  const categories = await authFetcher('/Category') || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center gap-4">
        <Link href="/admin/dashboard/items" className="p-3 bg-white/5 text-gray-300 rounded-xl hover:bg-white hover:text-black transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
            Add New <span className="text-nanotek-yellow">Item</span>
          </h1>
        </div>
      </div>

      <div className="bg-[#111111] border border-white/5 rounded-2xl p-8 max-w-4xl">
        <NewItemForm brands={brands} categories={categories} />
      </div>
    </div>
  );
}
