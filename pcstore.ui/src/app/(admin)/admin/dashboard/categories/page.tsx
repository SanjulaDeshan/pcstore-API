import { authFetcher } from '@/lib/api';
import { addCategory, deleteCategory } from '@/app/actions/inventory';
import { Trash2, Plus } from 'lucide-react';

export default async function CategoriesPage() {
  const categories = await authFetcher('/Category') || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
          Manage <span className="text-nanotek-yellow">Categories</span>
        </h1>
        <p className="text-gray-400 mt-1">Organize your store inventory into categories.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Add New Category</h2>
            <form action={addCategory} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Category Name</label>
                <input 
                  name="name"
                  type="text" 
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nanotek-yellow/50 transition-colors mt-2"
                  placeholder="e.g. Processors, Motherboards"
                />
              </div>
              <button type="submit" className="w-full bg-white text-black font-black uppercase tracking-widest py-3 rounded-xl hover:bg-nanotek-yellow transition-colors flex items-center justify-center gap-2">
                <Plus size={18} /> Add Category
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-white/5 border-b border-white/5">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Category Name</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {categories.map((category: any) => (
                  <tr key={category.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 font-bold text-white">{category.name}</td>
                    <td className="px-6 py-4 text-right">
                      <form action={deleteCategory.bind(null, category.id)}>
                        <button type="submit" className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                          <Trash2 size={16} />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr>
                    <td colSpan={2} className="px-6 py-8 text-center text-gray-500">No categories found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
