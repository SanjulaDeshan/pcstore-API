import { Mail, MapPin, Phone, Clock, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-16 animate-in fade-in duration-700 pb-20">
      
      {/* Header */}
      <div className="text-center space-y-4 pt-10">
        <h1 className="text-6xl font-black italic tracking-tighter text-white uppercase">
          Get In <span className="text-nanotek-yellow">Touch</span>
        </h1>
        <p className="text-gray-400 font-medium max-w-xl mx-auto">
          Need a custom build quote or support for an existing order? Our team of PC experts is here to help you out.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="bg-[#111111] border border-white/5 rounded-3xl p-8 hover:border-nanotek-yellow/30 transition-all group">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-nanotek-yellow mb-6 shadow-inner shadow-white/5 group-hover:scale-110 transition-transform">
              <Phone size={24} />
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-widest mb-2">Call Us</h3>
            <p className="text-gray-400 mb-4 font-medium">Monday to Saturday<br/>9:30 AM - 6:00 PM</p>
            <p className="text-2xl font-black text-nanotek-yellow">0777 292 272</p>
          </div>

          <div className="bg-[#111111] border border-white/5 rounded-3xl p-8 hover:border-nanotek-yellow/30 transition-all group">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-nanotek-yellow mb-6 shadow-inner shadow-white/5 group-hover:scale-110 transition-transform">
              <MapPin size={24} />
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-widest mb-2">Location</h3>
            <p className="text-gray-400 font-medium leading-relaxed">
              Nanotek Computer Solutions<br/>
              No 123, Galle Road,<br/>
              Colombo 04, Sri Lanka.
            </p>
          </div>

          <div className="bg-[#111111] border border-white/5 rounded-3xl p-8 hover:border-nanotek-yellow/30 transition-all group">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-nanotek-yellow mb-6 shadow-inner shadow-white/5 group-hover:scale-110 transition-transform">
              <Mail size={24} />
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-widest mb-2">Email</h3>
            <p className="text-gray-400 font-medium">For quotes & support:</p>
            <a href="mailto:info@nanotek.lk" className="text-lg font-black text-white hover:text-nanotek-yellow transition-colors mt-2 inline-block">
              info@nanotek.lk
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-[#111111] border border-white/5 rounded-[3rem] p-10 lg:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-nanotek-yellow/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-8">
              Send a <span className="text-nanotek-yellow">Message</span>
            </h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-nanotek-yellow outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-nanotek-yellow outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Subject</label>
                <input 
                  type="text" 
                  placeholder="Custom PC Build Quote"
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-nanotek-yellow outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Message</label>
                <textarea 
                  rows={6}
                  placeholder="Tell us what you're looking for..."
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-nanotek-yellow outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <button 
                type="button" 
                className="bg-nanotek-yellow text-black font-black uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-white hover:scale-105 transition-all flex items-center justify-center gap-3 w-full sm:w-auto shadow-lg shadow-nanotek-yellow/20"
              >
                Send Message <Send size={18} />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
