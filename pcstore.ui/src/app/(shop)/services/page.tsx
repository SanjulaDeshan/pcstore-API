// src/app/(shop)/services/page.tsx

const ServiceSection = ({ title, conditions }: { title: string, conditions: string[] }) => (
  <div className="bg-[#111111] border border-white/5 rounded-[2.5rem] p-10 flex flex-col h-full">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 bg-nanotek-yellow/10 rounded-2xl flex items-center justify-center text-nanotek-yellow text-xl">
        ★ {/* Replace with specific SVG icons for Warranty, Custom, Delivery */}
      </div>
      <h2 className="text-xl font-black italic uppercase text-white">{title}</h2>
    </div>
    
    <div className="mb-4">
      <span className="text-[10px] font-black uppercase text-nanotek-yellow bg-nanotek-yellow/10 px-3 py-1 rounded">
        Conditions
      </span>
    </div>

    <ul className="space-y-3 mt-4">
      {conditions.map((item, idx) => (
        <li key={idx} className="flex gap-3 text-xs text-gray-400 leading-relaxed">
          <span className="text-nanotek-yellow">•</span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 animate-in fade-in duration-1000">
      {/* <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-12 text-center">
        OUR <span className="text-nanotek-yellow">SERVICES</span>
      </h1> */}
      <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-8 border-l-4 border-nanotek-yellow pl-6">
        OUR SERVICES
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ServiceSection 
          title="Warranty Assured"
          conditions={[
            "Warranty is only for the hardware components.",
            "External damage or burn marks will void the warranty.",
            "Items with missing serial numbers are not eligible.",
            "Repairs may take up to 21 working days."
          ]}
        />
        <ServiceSection 
          title="Custom Orders"
          conditions={[
            "50% advance payment is required.",
            "Order cancellations are not allowed after confirmation.",
            "Availability is subject to international stock levels."
          ]}
        />
        <ServiceSection 
          title="Home Delivery"
          conditions={[
            "Islandwide delivery available via reputable couriers.",
            "Full payment required before dispatch.",
            "Shipping insurance can be added upon request."
          ]}
        />
      </div>
    </div>
  );
}