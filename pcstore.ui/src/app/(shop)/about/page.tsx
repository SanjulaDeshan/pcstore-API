// src/app/(shop)/about/page.tsx

import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="animate-in fade-in duration-1000 max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-8 border-l-4 border-nanotek-yellow pl-6">
        ABOUT
      </h1>

      {/* Store Interior Image */}
      <div className="relative w-full h-[400px] rounded-[2.5rem] overflow-hidden border border-white/5 mb-12">
        <Image 
          src="/about-store-interior.jpg" // Ensure you add this to your public folder
          alt="Nanotek Store Interior"
          fill
          className="object-cover opacity-80"
        />
      </div>

      {/* Content Sections */}
      <div className="space-y-8 text-gray-300 leading-relaxed text-sm">
        <p>
          Established in 2008 in Sri Lanka, Nanotek Computer Solutions has strived to be one of the leading retailers for branded & customizable computers and related products in today's market. Our many years of experience has provided us with the expertise to cater you; our valued customers with the latest technology, while providing an excellent service that would culminate in providing you the best available products.
        </p>
        <p>
          We believe in your passion, as fellow PC enthusiasts, we would be more than glad to provide you with any assistance when you're looking for branded computer solutions. If you visit our store, it would be possible for you to see for yourself the latest products that we have in our showroom, sourced from the international market.
        </p>
        <p>
          Whether you're building your own gaming PC or hoping to upgrade the computer you have for your desired purpose, Nanotek Computer Solutions has the ability to offer you the ideal solution that will meet your expectations. The premium hardware that we offer would be of outstanding quality and the brands that we choose would speak for themselves.
        </p>
        <p>
          We have understood what it means to be trusted by thousands of customers, and we intend on keeping that trust by continuing to provide you with the best products for affordable prices. We make it our responsibility to attend to your requirements of structuring the ideal PC for you.
        </p>
      </div>
    </div>
  );
}