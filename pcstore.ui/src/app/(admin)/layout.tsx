// src/app/(admin)/layout.tsx
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-black text-white overflow-hidden relative">
      {/* Client Sidebar Component */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative bg-[#111111] mt-[65px] md:mt-0">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-nanotek-yellow/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 p-6 md:p-10 min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
