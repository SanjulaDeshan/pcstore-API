import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Zap, ShieldCheck, Truck } from "lucide-react";
import HeroCarousel from "./HeroCarousel";
import AddToCartButton from "@/components/shop/AddToCartButton";

async function getData(endpoint: string) {
  const res = await fetch(`https://localhost:7297/api/${endpoint}`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function HomePage() {
  const [items, categories, brands, ads] = await Promise.all([
    getData('Item'),
    getData('Category'),
    getData('Brand'),
    getData('Advertisement?isActive=true')
  ]);

  // Latest 8 items (assuming items are roughly chronological, we reverse and slice)
  const latestItems = [...items].reverse().slice(0, 8);
  const featuredCategories = categories.slice(0, 6);

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. Dynamic Hero Carousel */}
      <HeroCarousel ads={ads} />

      {/* 2. Shop by Category */}
      <section className="space-y-8">
        <div className="flex items-center justify-between px-4">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">Shop by <span className="text-nanotek-yellow">Category</span></h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-8" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredCategories.map((cat: any) => (
            <Link key={cat.id} href={`/category/${cat.id}`} className="bg-[#111111] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 hover:border-nanotek-yellow/40 hover:bg-white/5 transition-all group">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:border-nanotek-yellow/50 transition-all shadow-inner shadow-white/5">
                <Zap className="text-gray-500 group-hover:text-nanotek-yellow transition-colors" size={24} />
              </div>
              <span className="font-bold text-xs text-gray-300 group-hover:text-white uppercase tracking-wider">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Latest Arrivals */}
      <section id="latest" className="space-y-8">
        <div className="flex items-center justify-between px-4">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">Latest <span className="text-nanotek-yellow">Arrivals</span></h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestItems.map((item: any) => (
            <div key={item.id} className="glass-card rounded-[2rem] p-6 hover:border-nanotek-yellow/30 transition-all group flex flex-col h-full bg-[#0a0a0a]">
              <div className="relative h-56 w-full mb-6 bg-black rounded-2xl flex items-center justify-center overflow-hidden border border-white/5 group-hover:border-white/10 transition-colors shadow-inner shadow-white/5">
                 <Image 
                  src={item.imageUrl || "https://placehold.co/400x400?text=No+Image"} 
                  alt={item.name}
                  fill
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-nanotek-yellow text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-nanotek-yellow/20">New</div>
              </div>

              <div className="space-y-4 flex-1 flex flex-col">
                 <h3 className="text-sm font-bold leading-snug line-clamp-2 text-gray-300 group-hover:text-white transition-colors">
                   {item.name}
                 </h3>

                 <div className="mt-auto space-y-4">
                    <div className="flex flex-col border-t border-white/10 pt-4">
                       <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Price</span>
                       <span className="text-2xl font-black text-white">{item.price} <span className="text-xs text-nanotek-yellow">LKR</span></span>
                    </div>
                    
                    <div className="flex flex-col gap-2 pt-2">
                      <AddToCartButton item={item} />
                      <Link 
                        href={`/product/${item.id}`}
                        className="w-full bg-transparent border border-white/10 text-gray-400 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-center hover:bg-white hover:text-black transition-all"
                      >
                        View Details
                      </Link>
                    </div>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Brand Showcase */}
      <section className="bg-[#111111] border border-white/5 rounded-[3rem] p-12 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-nanotek-yellow/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 text-center space-y-10">
          <div>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">Premium <span className="text-nanotek-yellow">Partners</span></h2>
            <p className="text-gray-500 text-sm mt-2 font-medium">We only stock the most reliable and high-performance brands.</p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            {brands.slice(0, 10).map((brand: any) => (
              <div key={brand.id} className="bg-black border border-white/10 px-8 py-4 rounded-2xl grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:border-nanotek-yellow/50 transition-all cursor-default shadow-inner shadow-white/5">
                <span className="text-xl font-black uppercase tracking-widest text-white">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Services Banner */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10 rounded-[2rem] p-10 flex flex-col justify-center relative overflow-hidden group shadow-xl shadow-black">
          <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity">
            <ShieldCheck size={200} />
          </div>
          <div className="relative z-10 space-y-4">
            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">Certified <span className="text-nanotek-yellow">Warranty</span></h3>
            <p className="text-gray-400 font-medium max-w-sm">Every component we sell is backed by official local warranty. We handle the RMAs so you don't have to.</p>
            <Link href="/services" className="inline-block text-xs font-bold text-nanotek-yellow uppercase tracking-widest mt-4 hover:text-white transition-colors">
              Learn More →
            </Link>
          </div>
        </div>

        <div className="bg-gradient-to-bl from-[#1a1a1a] to-black border border-white/10 rounded-[2rem] p-10 flex flex-col justify-center relative overflow-hidden group shadow-xl shadow-black">
          <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity">
            <Truck size={200} />
          </div>
          <div className="relative z-10 space-y-4">
            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">Island-wide <span className="text-nanotek-yellow">Delivery</span></h3>
            <p className="text-gray-400 font-medium max-w-sm">Secure and fully insured shipping to anywhere in Sri Lanka within 2-4 business days.</p>
            <Link href="/services" className="inline-block text-xs font-bold text-nanotek-yellow uppercase tracking-widest mt-4 hover:text-white transition-colors">
              Shipping Info →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}