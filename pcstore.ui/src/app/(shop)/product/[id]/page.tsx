import Image from "next/image";
import Link from "next/link";

async function getProductDetails(id: string) {
  // Base URL should be your environment variable in production
  const res = await fetch(`https://localhost:7297/api/Item/details/${id}`, { cache: 'no-store' });
  return res.ok ? res.json() : null;
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductDetails(id);

  if (!product) return <div className="p-20 text-white font-bold">Product not found.</div>;

  // Payment methods list for rendering icons
  const paymentMethods = ['Visa', 'Mastercard', 'Bank Transfer', 'COD', 'Koko', 'Mintpay'];

  return (
    <div className="animate-in fade-in duration-1000 max-w-7xl mx-auto px-4 lg:px-0">
      {/* 1. Header Navigation */}
      <div className="border-b border-white/5 pb-8 mb-10">
        <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">
          <Link href="/" className="hover:text-nanotek-yellow transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/category/${product.category.id}`} className="hover:text-nanotek-yellow transition-colors">{product.category.name}</Link>
        </div>
        <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white">
          {product.name}
        </h1>
      </div>

      {/* 2. Hero Section: Image and Purchase Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
        
        {/* Left: Product Image Container */}
        <div className="lg:col-span-8 flex items-center justify-center bg-[#111111] border border-white/5 rounded-[2.5rem] p-12 min-h-[500px]">
          <div className="relative w-full h-[400px]">
            <Image src={product.imageUrl || ""} alt={product.name} fill className="object-contain" />
          </div>
        </div>

        {/* Right: Price & Action Box (Modified layout) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-[#1a1a1a] border border-white/5 p-10 rounded-[2.5rem] flex flex-col h-full shadow-2xl">
            {/* Top Info Section */}
            <div className="space-y-6 mb-auto">
               <div>
                  <p className="text-[10px] font-black text-nanotek-yellow uppercase tracking-widest mb-2">Official Price</p>
                  <p className="text-5xl font-black italic text-white tracking-tighter">{product.price} LKR</p>
               </div>

               <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-gray-500 uppercase">Availability:</span>
                    <span className="text-[10px] font-black text-nanotek-yellow border border-nanotek-yellow/40 px-3 py-1 rounded uppercase">
                      {product.availability || "In Stock"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-gray-500 uppercase">Warranty:</span>
                    <span className="text-[10px] font-black text-white italic uppercase">
                      {product.warranty}
                    </span>
                  </div>
               </div>
            </div>
            
            {/* Bottom Action Section (Compact Layout) */}
            <div className="mt-10">
              <button className="w-full h-16 bg-nanotek-yellow text-black font-black uppercase tracking-widest rounded-2xl hover:scale-[1.03] transition-all shadow-[0_10px_30px_rgba(255,204,0,0.15)] active:scale-95 mb-8">
                Add to Cart
              </button>

              {/* New Payment Methods Section */}
              <div className="space-y-3">
                <p className="text-[10px] font-black text-nanotek-yellow uppercase tracking-widest">
                  PAYMENT METHODS
                </p>
                {/* Payment Icons Row (Simulated tech badges) */}
                <div className="flex flex-wrap items-center gap-2">
                    {paymentMethods.map((method) => (
                        <div key={method} className="h-7 px-3 bg-[#111111] border border-white/10 rounded flex items-center justify-center text-[9px] font-bold text-gray-400 uppercase tracking-tighter hover:border-nanotek-yellow/50 hover:text-nanotek-yellow transition-colors cursor-default shadow-sm">
                            {method}
                        </div>
                    ))}
                </div>
              </div>

              {/* Moved Shipping Text */}
              <p className="text-[9px] text-gray-600 font-bold uppercase text-center mt-6 tracking-widest">
                * Shipping available islandwide
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Detailed Specification Table */}
      <div className="space-y-10 mb-20">
         <div className="flex items-center gap-4">
            <div className="h-[1px] grow bg-white/10"></div>
            <h2 className="text-xl font-black italic uppercase tracking-tighter text-nanotek-yellow bg-[#080808] px-4">
                Detailed <span className="text-white">Specifications</span>
            </h2>
            <div className="h-[1px] grow bg-white/10"></div>
         </div>

         <div className="border border-white/5 rounded-[3rem] overflow-hidden bg-[#111111]">
            <table className="w-full text-left border-collapse">
                <tbody>
                    {product.itemSpecifications.map((spec: any, idx: number) => (
                        <tr key={spec.id} className="border-b border-white/5 group last:border-0 hover:bg-white/[0.02] transition-colors">
                            <td className="w-1/3 py-8 px-12 text-[11px] font-black uppercase tracking-widest text-nanotek-yellow italic">
                                {spec.name}
                            </td>
                            <td className="py-8 px-12 text-sm font-bold text-gray-200 italic">
                                {spec.value}
                            </td>
                        </tr>
                    ))}
                    {product.itemSpecifications.length === 0 && (
                        <tr>
                            <td colSpan={2} className="py-20 text-center text-gray-600 italic font-bold">
                                No technical data available for this model.
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