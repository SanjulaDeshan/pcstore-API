// src/app/(admin)/admin/login/page.tsx
import { loginAdmin } from '@/app/actions/auth';
import { Lock } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-nanotek-yellow/10 rounded-full blur-[120px]" />
      
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black italic tracking-tighter text-white">
            NANO<span className="text-nanotek-yellow">ADMIN</span>
          </h1>
          <p className="text-gray-400 mt-2 font-medium">Secure Access Portal</p>
        </div>

        <div className="glass-card bg-[#111111]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
          <form action={loginAdmin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Username</label>
              <input 
                name="username"
                type="text" 
                required
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nanotek-yellow/50 transition-colors"
                placeholder="Enter username"
                defaultValue="admin"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Password</label>
              <input 
                name="password"
                type="password" 
                required
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nanotek-yellow/50 transition-colors"
                placeholder="••••••••"
                defaultValue="Admin@123"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-nanotek-yellow text-black font-black uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              <Lock size={18} />
              Authenticate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
