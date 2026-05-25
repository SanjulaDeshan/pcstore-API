'use client';

import { useState } from 'react';
import { addAdvertisement, deleteAdvertisement, toggleAdvertisementStatus, updateAdvertisementAction } from '@/app/actions/marketing';
import { Trash2, Megaphone, CheckCircle2, XCircle, Edit2, X } from 'lucide-react';
import Image from 'next/image';

export default function AdsClient({ ads }: { ads: any[] }) {
  const [editingAd, setEditingAd] = useState<any>(null);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Ad List */}
      <div className="xl:col-span-2 space-y-6">
        <div className="bg-[#111111] border border-white/5 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-white/5 bg-white/[0.02]">
            <h2 className="text-lg font-black text-white uppercase tracking-wider">Active Banners</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-black/40">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Banner</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {ads.map((ad: any) => (
                  <tr key={ad.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-12 relative bg-black rounded-lg overflow-hidden border border-white/10">
                          {ad.imageUrl && (ad.imageUrl.startsWith('http') || ad.imageUrl.startsWith('/')) ? (
                            <Image src={ad.imageUrl} alt={ad.title} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[8px] text-gray-500 uppercase font-bold text-center p-1">Invalid URL</div>
                          )}
                        </div>
                        <div>
                          <span className="font-bold text-sm text-gray-200 block">{ad.title}</span>
                          <span className="text-[10px] font-bold text-gray-500 uppercase">{ad.subtitle || 'No Subtitle'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {ad.isActive ? (
                        <span className="flex items-center gap-2 text-[10px] font-black uppercase px-3 py-1.5 rounded-md bg-green-500/10 text-green-400 w-fit">
                          <CheckCircle2 size={14} /> Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 text-[10px] font-black uppercase px-3 py-1.5 rounded-md bg-red-500/10 text-red-400 w-fit">
                          <XCircle size={14} /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setEditingAd(ad)} className="p-2.5 bg-white/5 text-gray-400 rounded-lg hover:bg-white/20 hover:text-white transition-colors" title="Edit">
                          <Edit2 size={16} />
                        </button>
                        <form action={toggleAdvertisementStatus.bind(null, ad.id, ad.isActive, ad)}>
                          <button type="submit" className="p-2.5 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-colors" title={ad.isActive ? "Deactivate" : "Activate"}>
                            {ad.isActive ? <XCircle size={16} /> : <CheckCircle2 size={16} />}
                          </button>
                        </form>
                        <form action={deleteAdvertisement.bind(null, ad.id)}>
                          <button type="submit" className="p-2.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
                {ads.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center">
                      <Megaphone size={32} className="mx-auto text-gray-600 mb-3" />
                      <p className="text-gray-500 text-sm font-bold">No advertisements found.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add / Edit Ad Form */}
      <div>
        <div className="bg-[#111111] border border-white/5 rounded-3xl p-6 sticky top-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-3">
              <span className="w-2 h-6 bg-nanotek-yellow rounded-full inline-block"></span>
              {editingAd ? 'Edit Banner' : 'New Banner'}
            </h2>
            {editingAd && (
              <button onClick={() => setEditingAd(null)} className="text-gray-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
            )}
          </div>

          <form action={editingAd ? updateAdvertisementAction.bind(null, editingAd.id) : addAdvertisement} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Headline (Title)</label>
              <input key={`title-${editingAd?.id || 'new'}`} required type="text" name="title" defaultValue={editingAd?.title || ''} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-nanotek-yellow outline-none transition-colors" placeholder="e.g. LEVEL UP YOUR SETUP" />
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Tagline (Subtitle)</label>
              <input key={`subtitle-${editingAd?.id || 'new'}`} type="text" name="subtitle" defaultValue={editingAd?.subtitle || ''} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-nanotek-yellow outline-none transition-colors" placeholder="e.g. New Intel Core Ultra" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Image URL</label>
              <input key={`imageUrl-${editingAd?.id || 'new'}`} required type="text" name="imageUrl" defaultValue={editingAd?.imageUrl || ''} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-nanotek-yellow outline-none transition-colors" placeholder="https://..." />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Button Link</label>
              <input key={`linkUrl-${editingAd?.id || 'new'}`} type="text" name="linkUrl" defaultValue={editingAd?.linkUrl || ''} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-nanotek-yellow outline-none transition-colors" placeholder="e.g. /category/id" />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input key={`isActive-${editingAd?.id || 'new'}`} type="checkbox" name="isActive" id="isActive" defaultChecked={editingAd ? editingAd.isActive : true} className="w-4 h-4 accent-nanotek-yellow bg-black border-white/10" />
              <label htmlFor="isActive" className="text-sm font-bold text-gray-300">Set as Active</label>
            </div>

            <div className="pt-4 flex gap-3">
              <button type="submit" className="flex-1 bg-nanotek-yellow text-black font-black uppercase tracking-widest py-3.5 rounded-xl hover:bg-white hover:scale-[1.02] transition-all">
                {editingAd ? 'Save Changes' : 'Create Banner'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
