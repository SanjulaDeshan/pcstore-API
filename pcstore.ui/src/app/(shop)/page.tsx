// src/app/(shop)/page.tsx
import Image from "next/image";
import Link from "next/link";

async function getItems() {
  const res = await fetch("https://localhost:7297/api/Item", { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function HomePage() {
  const items = await getItems();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[450px] rounded-[2.5rem] overflow-hidden border border-white/10 flex items-center group">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        <div className="relative z-20 px-16 space-y-6">
          <h2 className="text-7xl font-black italic tracking-tighter leading-[0.9]">
            LEVEL <span className="text-nanotek-yellow">UP</span><br/>YOUR SETUP
          </h2>
          <p className="text-gray-400 max-w-md font-medium">Build your dream PC today with Nanotek's certified hardware and local warranty assurance.</p>
          <button className="bg-white text-black h-14 px-10 rounded-full font-black hover:bg-nanotek-yellow hover:scale-105 transition-all neon-shadow">
            CUSTOMIZE NOW
          </button>
        </div>
        {/* Tech Decor element in background */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-nanotek-yellow/10 rounded-full blur-[100px] group-hover:bg-nanotek-yellow/20 transition-all" />
      </section>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {items.map((item: any) => (
          <div key={item.id} className="glass-card rounded-[2rem] p-6 hover:border-nanotek-yellow/30 transition-all group flex flex-col">
            <div className="relative h-60 w-full mb-6 bg-white/5 rounded-2xl flex items-center justify-center overflow-hidden">
               <Image 
                src={item.imageUrl || "https://placehold.co/400x400?text=No+Image"} 
                alt={item.name}
                fill
                className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="space-y-4 flex-1 flex flex-col">
               <div className="flex justify-between items-start">
                  <h3 className="text-sm font-bold leading-snug line-clamp-2 text-gray-200 group-hover:text-white transition-colors">
                    {item.name}
                  </h3>
               </div>

               <div className="mt-auto space-y-4">
                  <div className="flex items-baseline justify-between">
                     <span className="text-2xl font-black text-white">{item.price} <span className="text-[10px] text-gray-500 uppercase">LKR</span></span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Link 
                      href={`/product/${item.id}`}
                      className="flex-1 bg-white/5 border border-white/10 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-center hover:bg-nanotek-yellow hover:text-black hover:border-nanotek-yellow transition-all"
                    >
                      View Specs
                    </Link>
                    <button className="w-12 h-12 bg-nanotek-yellow text-black rounded-xl flex items-center justify-center font-bold hover:scale-110 transition-transform shadow-lg shadow-nanotek-yellow/20">
                      +
                    </button>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}