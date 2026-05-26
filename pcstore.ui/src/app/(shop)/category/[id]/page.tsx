// src/app/(shop)/category/[id]/page.tsx

import Image from "next/image";
import Link from "next/link";
import PriceRangeSlider from "@/components/PriceRangeSlider";
import SidebarSearch from "@/components/SidebarSearch";
import AddToCartButton from "@/components/shop/AddToCartButton";

async function getBrandName(id: string) {
  const res = await fetch(`https://localhost:7297/api/Brand/${id}`, { cache: 'no-store' });
  return res.ok ? res.json() : null;
}

async function getCategoryData(id: string, page: number, filters: any) {
  const { brand, min, max, search, availability } = filters;
  const url = `https://localhost:7297/api/Item/category/${id}?pageNumber=${page}&pageSize=12` +
    `${brand ? `&brand=${brand}` : ''}${min ? `&minPrice=${min}` : ''}${max ? `&maxPrice=${max}` : ''}` +
    `${search ? `&search=${search}` : ''}${availability ? `&availability=${availability}` : ''}`;
    
  const res = await fetch(url, { cache: 'no-store' });
  return res.ok ? res.json() : null;
}

export default async function CategoryPage({ params, searchParams }: any) {
  const { id } = await params;
  const sParams = await searchParams;
  
  const filters = {
    brand: sParams.brand,
    min: sParams.minPrice,
    max: sParams.maxPrice,
    search: sParams.search,
    availability: sParams.availability
  };

  const result = await getCategoryData(id, Number(sParams.pageNumber) || 1, filters);
  if (!result) return <div className="p-10 text-white font-bold">No items found.</div>;

  const items = result.data;
  const totalPages = Math.ceil(result.totalCount / 12);
  const uniqueBrandIds = Array.from(new Set(items.map((item: any) => item.brand.id))) as string[];
  const brandList = await Promise.all(uniqueBrandIds.map(brandId => getBrandName(brandId)));
  const validBrands = brandList.filter(b => b !== null);

  return (
    <div className="animate-in fade-in duration-700">
      <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-8">
        {items[0]?.category?.name} <span className="text-nanotek-yellow">LINEUP</span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-0">
        <aside className="w-full lg:w-80 flex-shrink-0 pr-10 space-y-6">
          <SidebarSearch />

          <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6">
            <h3 className="text-xs font-black uppercase text-nanotek-yellow mb-6 italic tracking-widest">Price Filter</h3>
            <PriceRangeSlider 
              minBound={0} 
              maxBound={1500000} 
              currentMin={filters.min} 
              currentMax={filters.max} 
            />
          </div>

          <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6">
            <h3 className="text-xs font-black uppercase text-nanotek-yellow mb-4 italic tracking-widest">Available Brands</h3>
            <div className="space-y-3">
              {validBrands.map((brand: any) => (
                <Link key={brand.id} href={`/category/${id}?brand=${brand.name}&minPrice=${filters.min || ''}&maxPrice=${filters.max || ''}`}
                  className={`flex items-center gap-3 text-[11px] font-bold uppercase transition-all ${filters.brand === brand.name ? 'text-nanotek-yellow' : 'text-gray-500 hover:text-white'}`}>
                  <div className={`w-3 h-3 border rounded-sm ${filters.brand === brand.name ? 'bg-nanotek-yellow border-nanotek-yellow' : 'border-gray-700'}`} />
                  {brand.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6">
            <h3 className="text-xs font-black uppercase text-nanotek-yellow mb-4 italic tracking-widest">Availability</h3>
            <div className="space-y-3">
              {["In Stock", "Out of Stock", "Pre Order"].map((status) => (
                <Link key={status} href={`/category/${id}?availability=${status}`} className={`flex items-center gap-3 text-[11px] font-bold uppercase ${filters.availability === status ? 'text-nanotek-yellow' : 'text-gray-500 hover:text-white'}`}>
                  <div className={`w-3 h-3 border rounded-sm ${filters.availability === status ? 'bg-nanotek-yellow border-nanotek-yellow' : 'border-gray-700'}`} />
                  {status}
                </Link>
              ))}
            </div>
          </div>

          <Link href={`/category/${id}`} className="block text-center bg-white/5 border border-white/10 py-3 rounded-xl text-[10px] font-black uppercase text-red-500 hover:bg-red-500 hover:text-white transition-all">
            × RESET ALL FILTERS
          </Link>
        </aside>

        <div className="hidden lg:block w-[1px] bg-white/10 self-stretch mr-10"></div>

        <div className="flex-1 flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {items.map((item: any) => (
              <div key={item.id} className="bg-[#111111] border border-white/5 group hover:border-nanotek-yellow/40 transition-all duration-500 flex flex-col h-full rounded-[2rem] overflow-hidden">
                <Link href={`/product/${item.id}`} className="block relative h-64 bg-white/[0.02] flex items-center justify-center p-8 overflow-hidden">
                  <Image src={item.imageUrl || ""} alt={item.name} fill className="object-contain p-6 group-hover:scale-105 transition-transform duration-700" />
                </Link>
                <div className="p-6 flex-1 flex flex-col text-center">
                  <Link href={`/product/${item.id}`}>
                    <h3 className="text-sm font-bold leading-tight text-white uppercase line-clamp-2 min-h-[40px] mb-2 group-hover:text-nanotek-yellow transition-colors">{item.name}</h3>
                  </Link>
                  <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-4 italic">- {items[0]?.category?.name} -</p>
                  <div className="mt-auto space-y-4">
                    <div>
                      <span className="text-2xl font-black text-white block mb-1">{item.price} LKR</span>
                      <div className="inline-block border border-nanotek-yellow/40 px-4 py-1 rounded text-[10px] font-bold text-nanotek-yellow uppercase tracking-tighter">{item.availability || "In Stock"}</div>
                    </div>
                    
                    <div className="pt-2 border-t border-white/5">
                      <AddToCartButton item={item} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 pb-10">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Link key={page} href={`/category/${id}?pageNumber=${page}&brand=${filters.brand || ''}&minPrice=${filters.min || ''}&maxPrice=${filters.max || ''}&search=${filters.search || ''}&availability=${filters.availability || ''}`}
                  className={`w-12 h-12 flex items-center justify-center rounded-xl font-black border transition-all ${Number(sParams.pageNumber || 1) === page ? "bg-nanotek-yellow text-black border-nanotek-yellow shadow-[0_0_20px_rgba(255,204,0,0.3)] scale-110" : "bg-[#1a1a1a] text-gray-500 border-white/5 hover:text-white"}`}>
                  {page}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}