import { authFetcher } from '@/lib/api';
import { deleteItem } from '@/app/actions/inventory';
import { Trash2, Plus, Edit, Package } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default async function ItemsPage() {
  // Fetch items and categories in parallel
  const [items, categories] = await Promise.all([
    authFetcher('/Item'),
    authFetcher('/Category')
  ]);

  const safeItems = items || [];
  const safeCategories = categories || [];

  // Group items by categoryId
  const groupedItems = safeCategories.map((category: any) => {
    return {
      category,
      items: safeItems.filter((item: any) => item.categoryId === category.id)
    };
  });

  // Items that don't match any fetched category (just in case)
  const uncategorizedItems = safeItems.filter(
    (item: any) => !safeCategories.find((c: any) => c.id === item.categoryId)
  );

  if (uncategorizedItems.length > 0) {
    groupedItems.push({
      category: { id: 'uncategorized', name: 'Uncategorized' },
      items: uncategorizedItems
    });
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
            Manage <span className="text-nanotek-yellow">Items</span>
          </h1>
          <p className="text-gray-400 mt-1">Manage all PC products grouped by category.</p>
        </div>
        <Link href="/admin/dashboard/items/new" className="bg-nanotek-yellow text-black font-black uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2">
          <Plus size={18} /> Add Item
        </Link>
      </div>

      <div className="space-y-10">
        {groupedItems.map((group: any) => {
          // Skip rendering empty categories to keep the UI clean
          if (group.items.length === 0) return null;

          return (
            <div key={group.category.id} className="bg-[#111111] border border-white/5 rounded-3xl overflow-hidden">
              <div className="bg-white/[0.02] border-b border-white/5 p-6 flex justify-between items-center">
                <h2 className="text-xl font-black uppercase tracking-widest text-white flex items-center gap-3">
                  <span className="w-2 h-8 bg-nanotek-yellow rounded-full inline-block"></span>
                  {group.category.name}
                </h2>
                <span className="bg-white/10 text-gray-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  {group.items.length} Items
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-black/40">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Product</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Price</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Availability</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {group.items.map((item: any) => (
                      <tr key={item.id} className="hover:bg-white/5 transition-colors group/row">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 relative bg-black rounded-xl overflow-hidden border border-white/10">
                              <Image src={item.imageUrl || "https://placehold.co/100x100"} alt={item.name} fill className="object-contain p-1 group-hover/row:scale-110 transition-transform" />
                            </div>
                            <span className="font-bold text-sm text-gray-200 group-hover/row:text-white transition-colors">{item.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-black text-sm text-nanotek-yellow">{item.price} LKR</td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-md tracking-wider ${item.availability === 'In Stock' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                            {item.availability}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover/row:opacity-100 transition-opacity">
                            <Link href={`/admin/dashboard/items/${item.id}`} className="p-2.5 bg-white/5 text-gray-300 rounded-lg hover:bg-white hover:text-black transition-colors shadow-sm">
                              <Edit size={16} />
                            </Link>
                            <form action={deleteItem.bind(null, item.id)}>
                              <button type="submit" className="p-2.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors shadow-sm">
                                <Trash2 size={16} />
                              </button>
                            </form>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

        {/* Show a global empty state if NO items exist at all */}
        {safeItems.length === 0 && (
          <div className="bg-[#111111] border border-white/5 rounded-3xl p-16 text-center">
            <Package size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-black text-white uppercase tracking-widest mb-2">Inventory Empty</h3>
            <p className="text-gray-500 font-medium max-w-md mx-auto">There are currently no products in the store. Click the Add Item button above to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
