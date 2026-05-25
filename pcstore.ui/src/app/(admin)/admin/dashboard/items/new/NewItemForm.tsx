'use client';
import { useState } from 'react';
import { addItem } from '@/app/actions/inventory';
import { Save, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NewItemForm({ brands, categories }: { brands: any[], categories: any[] }) {
  const router = useRouter();
  const [specs, setSpecs] = useState([{ name: '', value: '' }]);

  const addSpec = () => setSpecs([...specs, { name: '', value: '' }]);
  const updateSpec = (index: number, field: 'name' | 'value', val: string) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = val;
    setSpecs(newSpecs);
  };
  const removeSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  return (
    <form action={async (formData) => {
      formData.append('specs', JSON.stringify(specs));
      await addItem(formData);
      router.push('/admin/dashboard/items');
    }} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Product Name</label>
          <input name="name" type="text" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nanotek-yellow/50 transition-colors" />
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Price (LKR)</label>
          <input name="price" type="text" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nanotek-yellow/50 transition-colors" />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Category</label>
          <select name="categoryId" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nanotek-yellow/50 transition-colors">
            <option value="">Select Category</option>
            {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Brand</label>
          <select name="brandId" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nanotek-yellow/50 transition-colors">
            <option value="">Select Brand</option>
            {brands.map((b: any) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Availability</label>
          <select name="availability" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nanotek-yellow/50 transition-colors">
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Pre Order">Pre Order</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Warranty</label>
          <input name="warranty" type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nanotek-yellow/50 transition-colors" placeholder="e.g. 3 Years" />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Image URL</label>
          <input name="imageUrl" type="url" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nanotek-yellow/50 transition-colors" placeholder="https://..." />
        </div>
      </div>

      <div className="border-t border-white/10 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white">Specifications</h2>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Add dynamic key/value properties</p>
          </div>
          <button type="button" onClick={addSpec} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
            <Plus size={14} /> Add Row
          </button>
        </div>

        <div className="space-y-3 bg-black/20 p-4 rounded-2xl border border-white/5">
          {specs.map((spec, index) => (
            <div key={index} className="flex items-center gap-4">
              <input 
                type="text" 
                value={spec.name} 
                onChange={(e) => updateSpec(index, 'name', e.target.value)} 
                placeholder="Name (e.g. Storage)" 
                className="w-1/3 bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-nanotek-yellow/50" 
              />
              <input 
                type="text" 
                value={spec.value} 
                onChange={(e) => updateSpec(index, 'value', e.target.value)} 
                placeholder="Value (e.g. 1TB NVMe)" 
                className="w-2/3 bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-nanotek-yellow/50" 
              />
              <button type="button" onClick={() => removeSpec(index)} className="p-3 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {specs.length === 0 && (
            <p className="text-center text-xs text-gray-500 py-2">No specifications added. Click Add Row.</p>
          )}
        </div>
      </div>

      <button type="submit" className="w-full bg-nanotek-yellow text-black font-black uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2 mt-8">
        <Save size={18} /> Create Item
      </button>
    </form>
  );
}
