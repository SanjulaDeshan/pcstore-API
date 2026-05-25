import { authFetcher } from '@/lib/api';
import { updateItem, addItemSpec, deleteItemSpec } from '@/app/actions/inventory';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default async function EditItemPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const item = await authFetcher(`/Item/${id}`);
  const brands = await authFetcher('/Brand') || [];
  const categories = await authFetcher('/Category') || [];
  const specs = await authFetcher('/ItemSpecification') || [];
  
  // Filter specs for this item
  const itemSpecs = specs.filter((s: any) => s.itemId === id);

  if (!item) return <div>Item not found</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/admin/dashboard/items" className="p-3 bg-white/5 text-gray-300 rounded-xl hover:bg-white hover:text-black transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
            Edit <span className="text-nanotek-yellow">Item</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-[#111111] border border-white/5 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">General Details</h2>
          <form action={updateItem.bind(null, id)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Product Name</label>
                <input name="name" type="text" defaultValue={item.name} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nanotek-yellow/50 transition-colors" />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Price (LKR)</label>
                <input name="price" type="text" defaultValue={item.price} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nanotek-yellow/50 transition-colors" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Category</label>
                <select name="categoryId" defaultValue={item.categoryId} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nanotek-yellow/50 transition-colors">
                  {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Brand</label>
                <select name="brandId" defaultValue={item.brandId} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nanotek-yellow/50 transition-colors">
                  {brands.map((b: any) => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Availability</label>
                <select name="availability" defaultValue={item.availability} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nanotek-yellow/50 transition-colors">
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="Pre Order">Pre Order</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Warranty</label>
                <input name="warranty" type="text" defaultValue={item.warranty} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nanotek-yellow/50 transition-colors" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Image URL</label>
                <input name="imageUrl" type="url" defaultValue={item.imageUrl} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nanotek-yellow/50 transition-colors" />
              </div>
            </div>

            <button type="submit" className="w-full bg-white text-black font-black uppercase tracking-widest py-4 rounded-xl hover:bg-nanotek-yellow transition-colors flex items-center justify-center gap-2 mt-8">
              <Save size={18} /> Update Item
            </button>
          </form>
        </div>

        <div className="xl:col-span-1 space-y-6">
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Specifications</h2>
            
            <form action={addItemSpec} className="space-y-4 mb-8 bg-white/5 p-4 rounded-xl border border-white/10">
              <input type="hidden" name="itemId" value={id} />
              <div>
                <input name="name" type="text" required placeholder="Name (e.g. Memory)" className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-nanotek-yellow/50" />
              </div>
              <div>
                <input name="value" type="text" required placeholder="Value (e.g. 16GB DDR5)" className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-nanotek-yellow/50" />
              </div>
              <button type="submit" className="w-full bg-nanotek-yellow text-black font-bold uppercase text-xs tracking-widest py-2 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2">
                <Plus size={14} /> Add Spec
              </button>
            </form>

            <ul className="space-y-2">
              {itemSpecs.map((spec: any) => (
                <li key={spec.id} className="flex items-center justify-between bg-black/50 border border-white/5 p-3 rounded-xl group hover:border-white/10 transition-colors">
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{spec.name}</p>
                    <p className="text-sm text-white font-medium">{spec.value}</p>
                  </div>
                  <form action={deleteItemSpec.bind(null, spec.id, id)}>
                    <button type="submit" className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 size={14} />
                    </button>
                  </form>
                </li>
              ))}
              {itemSpecs.length === 0 && (
                <p className="text-xs text-center text-gray-500 py-4">No specifications added yet.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
