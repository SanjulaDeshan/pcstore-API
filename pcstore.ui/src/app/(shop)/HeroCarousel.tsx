'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroCarousel({ ads }: { ads: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (ads.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, 5000); // 5 seconds per slide
    return () => clearInterval(interval);
  }, [ads.length]);

  if (!ads || ads.length === 0) {
    // Fallback static hero if no ads are in the database
    return (
      <section className="relative h-[450px] md:h-[500px] lg:h-[600px] rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 flex items-center group shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        
        <div className="relative z-20 px-6 md:px-20 space-y-4 md:space-y-8 max-w-3xl">
          <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-[0.9] text-white">
            LEVEL <span className="text-nanotek-yellow">UP</span><br/>YOUR SETUP
          </h2>
          <p className="text-gray-400 max-w-lg font-medium text-sm md:text-lg leading-relaxed">
            Build your dream PC today with Nanotek's certified hardware, expert assembly, and island-wide premium warranty.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <Link href="#latest" className="bg-nanotek-yellow text-black h-14 px-10 rounded-full font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white hover:scale-105 transition-all neon-shadow">
              Shop Now <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const currentAd = ads[currentIndex];

  return (
    <section className="relative h-[450px] md:h-[500px] lg:h-[600px] rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 flex items-center shadow-2xl">
      {/* Background Image that changes */}
      {ads.map((ad, idx) => (
        <div 
          key={ad.id}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
          style={{ backgroundImage: `url('${ad.imageUrl}')` }}
        />
      ))}
      {/* Light gradient overlay for button visibility at the bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 md:via-black/20 to-transparent z-10 pointer-events-none" />
      
      {/* Content that changes */}
      <div className="relative z-20 w-full h-full flex flex-col justify-end px-6 md:px-16 pb-12 md:pb-16">
        {ads.map((ad, idx) => (
          <div 
            key={ad.id} 
            className={`transition-all duration-700 absolute bottom-12 md:bottom-16 w-[85%] md:w-auto max-w-2xl ${idx === currentIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
          >
            {(ad.title || ad.subtitle) && (
              <div className="backdrop-blur-xl bg-black/40 border border-white/10 p-5 md:p-8 rounded-2xl md:rounded-3xl mb-4 md:mb-6 shadow-2xl">
                {ad.subtitle && (
                  <div className="inline-block px-4 py-1.5 bg-nanotek-yellow text-black rounded-full mb-4">
                    <span className="font-black uppercase tracking-[0.2em] text-[10px]">{ad.subtitle}</span>
                  </div>
                )}
                {ad.title && (
                  <h2 className="text-3xl md:text-6xl font-black italic tracking-tighter leading-tight text-white drop-shadow-lg">
                    {ad.title}
                  </h2>
                )}
              </div>
            )}
            <div className="flex items-center gap-4 pointer-events-auto">
              <Link href={ad.linkUrl || '#latest'} className="bg-nanotek-yellow text-black h-14 px-10 rounded-full font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,215,0,0.3)]">
                Explore Now <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Indicators */}
      {ads.length > 1 && (
        <div className="absolute bottom-4 left-0 w-full flex justify-center md:w-auto md:left-auto md:bottom-8 md:right-10 z-30 gap-2">
          {ads.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex ? 'bg-nanotek-yellow w-8' : 'bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
