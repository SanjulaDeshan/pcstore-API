import { LayoutDashboard, Users, ShoppingCart, Activity, Plus, Package, Tags, ListTree, ArrowRight } from 'lucide-react';
import { authFetcher } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';

export default async function AdminDashboard() {
  // Fetch real data in parallel
  const [items, brands, categories] = await Promise.all([
    authFetcher('/Item'),
    authFetcher('/Brand'),
    authFetcher('/Category')
  ]);

  const safeItems = items || [];
  const safeBrands = brands || [];
  const safeCategories = categories || [];

  // Assuming items are returned in order of creation (or we can just take the last 5)
  // For safety, we just slice the array. If it's already newest-first, great. If not, `.slice(-5).reverse()` gives the newest if appended.
  const recentItems = [...safeItems].reverse().slice(0, 5);

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-10">
      
      {/* Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
            Dashboard
          </h1>
          <p className="text-gray-400 mt-1">Welcome back. Here is your real-time store overview.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/admin/dashboard/items/new" className="bg-nanotek-yellow text-black font-black uppercase tracking-widest px-5 py-2.5 rounded-xl hover:bg-white transition-colors flex items-center gap-2 text-xs">
            <Plus size={16} /> New Item
          </Link>
          <Link href="/admin/dashboard/brands" className="bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2 text-xs">
            <Tags size={16} /> Add Brand
          </Link>
          <Link href="/admin/dashboard/categories" className="bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2 text-xs">
            <ListTree size={16} /> Add Category
          </Link>
        </div>
      </div>

      {/* Real-time Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Items", val: safeItems.length, icon: ShoppingCart },
          { title: "Active Brands", val: safeBrands.length, icon: Tags },
          { title: "Categories", val: safeCategories.length, icon: LayoutDashboard },
          { title: "API Status", val: "Online", icon: Activity }
        ].map((stat, i) => (
          <div key={i} className="bg-[#111111] border border-white/5 rounded-3xl p-6 flex items-center justify-between hover:border-nanotek-yellow/30 transition-colors group">
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{stat.title}</p>
              <h3 className="text-4xl font-black text-white mt-1 group-hover:text-nanotek-yellow transition-colors">{stat.val}</h3>
            </div>
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-nanotek-yellow shadow-inner shadow-white/5">
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Recently Added Items Widget */}
      <div className="bg-[#111111] border border-white/5 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <div>
            <h2 className="text-lg font-black text-white uppercase tracking-wider">Recently Added Items</h2>
            <p className="text-xs font-medium text-gray-500">The latest products uploaded to the store.</p>
          </div>
          <Link href="/admin/dashboard/items" className="text-xs font-bold text-nanotek-yellow uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-black/40">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Product</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Price</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Availability</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentItems.map((item: any) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 relative bg-black rounded-lg overflow-hidden border border-white/10">
                        <Image src={item.imageUrl || "https://placehold.co/100x100"} alt={item.name} fill className="object-contain p-1 group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="font-bold text-sm text-gray-200 group-hover:text-white transition-colors">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-black text-xs text-nanotek-yellow">{item.price} LKR</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-md tracking-wider ${item.availability === 'In Stock' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                      {item.availability}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/dashboard/items/${item.id}`} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-nanotek-yellow transition-colors">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
              {recentItems.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <Package size={32} className="mx-auto text-gray-600 mb-3" />
                    <p className="text-gray-500 text-sm font-bold">No items found in the database.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
