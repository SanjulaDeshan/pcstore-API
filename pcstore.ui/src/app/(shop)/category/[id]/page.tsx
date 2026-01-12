// src/app/(shop)/category/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";

async function getCategoryData(id: string, page: number, brand?: string) {
  // Ensure we pass the pageNumber to your updated .NET API
  const url = `https://localhost:7297/api/Item/category/${id}?pageNumber=${page}&pageSize=12${brand ? `&brand=${brand}` : ''}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function CategoryPage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ id: string }>,
  searchParams: Promise<{ pageNumber?: string, brand?: string }> 
}) {
  // 1. Resolve Next.js 15 Promises
  const { id } = await params;
  const sParams = await searchParams;
  
  const currentPage = Number(sParams.pageNumber) || 1;
  const currentBrand = sParams.brand || "";
  
  const result = await getCategoryData(id, currentPage, currentBrand);

  if (!result) return <div className="text-white p-10 font-bold">No results found.</div>;

  const items = result.data;
  const totalItems = result.totalCount;
  const pageSize = result.pageSize || 12;
  const totalPages = Math.ceil(totalItems / pageSize);
  const categoryName = items[0]?.category?.name || "Category";

  return (
    <div className="animate-in fade-in duration-700">
      <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-8">
        {categoryName} <span className="text-nanotek-yellow">LINEUP</span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-0">
        {/* SIDEBAR */}
        <aside className="w-full lg:w-72 flex-shrink-0 pr-8 pb-10">
          <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 mb-6">
            <h3 className="text-xs font-black uppercase text-nanotek-yellow mb-4 tracking-widest italic">Brands</h3>
            <div className="space-y-3">
              {["Asus", "Corsair", "MSI", "Gigabyte"].map((b) => (
                <Link 
                  key={b}
                  href={`/category/${id}?brand=${b}`}
                  className={`block text-xs font-bold uppercase transition-colors ${currentBrand === b ? 'text-nanotek-yellow' : 'text-gray-500 hover:text-white'}`}
                >
                  {currentBrand === b && "• "} {b}
                </Link>
              ))}
              {currentBrand && (
                <Link href={`/category/${id}`} className="block text-[10px] text-red-500 font-black uppercase mt-4 hover:underline">
                  Clear Filters
                </Link>
              )}
            </div>
          </div>
        </aside>

        <div className="hidden lg:block w-[1px] bg-white/10 self-stretch mr-8"></div>

        {/* PRODUCT GRID AREA */}
        <div className="flex-1 flex flex-col">
          {/* THE GRID (Design Not Changed) */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {items.map((item: any) => (
              <Link 
                href={`/product/${item.id}`} 
                key={item.id} 
                className="bg-[#111111] border border-white/5 group hover:border-nanotek-yellow/40 transition-all duration-500 flex flex-col h-full rounded-[2rem] overflow-hidden"
              >
                <div className="relative h-64 bg-white/[0.02] flex items-center justify-center p-8 overflow-hidden">
                  <Image src={item.imageUrl || ""} alt={item.name} fill className="object-contain p-6 group-hover:scale-105 transition-transform duration-700" />
                </div>

                <div className="p-6 flex-1 flex flex-col text-center">
                  <h3 className="text-sm font-bold leading-tight text-white uppercase line-clamp-2 min-h-[40px] mb-2 group-hover:text-nanotek-yellow transition-colors">{item.name}</h3>
                  <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-4 italic">- {categoryName} -</p>
                  
                  <div className="mt-auto">
                    <span className="text-2xl font-black text-white block mb-4">{item.price} LKR</span>
                    <div className="inline-block border border-nanotek-yellow/40 px-4 py-1 rounded text-[10px] font-bold text-nanotek-yellow uppercase tracking-tighter">
                      {item.availability || "In Stock"}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* PAGINATION UI (Added Here) */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-16 pb-10">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Link
                  key={page}
                  href={`/category/${id}?pageNumber=${page}${currentBrand ? `&brand=${currentBrand}` : ''}`}
                  className={`w-12 h-12 flex items-center justify-center rounded-xl font-black transition-all duration-300 border ${
                    currentPage === page 
                    ? "bg-nanotek-yellow text-black border-nanotek-yellow shadow-[0_0_20px_rgba(255,204,0,0.3)] scale-110" 
                    : "bg-[#1a1a1a] text-gray-500 border-white/5 hover:border-nanotek-yellow/50 hover:text-white"
                  }`}
                >
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