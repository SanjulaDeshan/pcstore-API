// src/app/(shop)/services/page.tsx
import { ShieldCheck, Wrench, Truck, ShieldAlert, BadgeInfo } from "lucide-react";

interface ServiceProps {
  title: string;
  icon: React.ReactNode;
  conditions: string[];
}

const ServiceSection = ({ title, icon, conditions }: ServiceProps) => (
  <div className="glass-card rounded-[2rem] p-8 hover:border-nanotek-yellow/30 transition-all duration-500 group flex flex-col h-full bg-white/5 border border-white/10 overflow-hidden relative">
    
    {/* Background Glow */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-nanotek-yellow/5 rounded-full blur-[50px] group-hover:bg-nanotek-yellow/20 transition-all duration-700" />

    <div className="flex items-center gap-5 mb-8 relative z-10">
      <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-nanotek-yellow group-hover:scale-110 group-hover:bg-nanotek-yellow group-hover:text-black transition-all duration-300 shadow-lg group-hover:shadow-nanotek-yellow/30">
        {icon}
      </div>
      <h2 className="text-2xl font-black italic uppercase text-white tracking-tight">{title}</h2>
    </div>
    
    <div className="mb-6 relative z-10">
      <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
        <BadgeInfo className="w-4 h-4 text-nanotek-yellow" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-300">
          Terms & Conditions
        </span>
      </div>
    </div>

    <ul className="space-y-4 mt-2 flex-1 relative z-10">
      {conditions.map((item, idx) => (
        <li key={idx} className="flex gap-3 text-sm text-gray-400 leading-relaxed font-medium group-hover:text-gray-300 transition-colors">
          <ShieldAlert className="w-4 h-4 mt-0.5 text-nanotek-yellow/50 flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default function ServicesPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative h-[300px] rounded-[2.5rem] overflow-hidden border border-white/10 flex items-center group">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        
        {/* Abstract Background pattern/gradient */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-transparent via-nanotek-yellow/10 to-transparent mix-blend-overlay" />

        <div className="relative z-20 px-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-nanotek-yellow/10 text-nanotek-yellow px-4 py-2 rounded-full border border-nanotek-yellow/20 mb-2">
            <span className="w-2 h-2 rounded-full bg-nanotek-yellow animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase">Premium Support</span>
          </div>
          <h2 className="text-6xl font-black italic tracking-tighter leading-[0.9] text-white">
            OUR <span className="text-nanotek-yellow">SERVICES</span>
          </h2>
          <p className="text-gray-400 max-w-md font-medium text-lg">
            Dedicated support, custom builds, and guaranteed reliability for your ultimate setup.
          </p>
        </div>

        {/* Tech Decor element in background */}
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-nanotek-yellow/10 rounded-full blur-[120px] group-hover:bg-nanotek-yellow/20 transition-all duration-1000" />
      </section>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ServiceSection 
          title="Warranty Assured"
          icon={<ShieldCheck className="w-8 h-8" />}
          conditions={[
            "Warranty is valid exclusively for internal hardware components.",
            "External physical damage, liquid damage, or burn marks will strictly void the warranty.",
            "Items returned without original serial number stickers are not eligible.",
            "Hardware diagnostic and repairs may take up to 21 working days."
          ]}
        />
        <ServiceSection 
          title="Custom Orders"
          icon={<Wrench className="w-8 h-8" />}
            conditions={[
            "A non-refundable 50% advance payment is required for all custom orders.",
            "Order cancellations or modifications are not permitted once confirmed.",
            "Fulfillment timeline is subject to international shipping and stock availability.",
            "Special requests must be finalized before the initial invoice."
          ]}
        />
        <ServiceSection 
          title="Home Delivery"
          icon={<Truck className="w-8 h-8" />}
          conditions={[
            "Islandwide delivery available via our certified courier partners.",
            "100% full payment must be cleared before the package is dispatched.",
            "Shipping insurance can be added upon request for premium setups.",
            "Delivery typically takes 2-5 business days depending on location."
          ]}
        />
      </div>
    </div>
  );
}