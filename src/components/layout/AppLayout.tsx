import { Outlet } from "react-router-dom";
import { BottomNav } from "./BottomNav";
import { Smartphone } from "lucide-react";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] sm:bg-gray-100 flex items-center justify-center font-sans">
      {/* Mobile App Container / Phone Mockup on Desktop */}
      <div className="w-full h-[100dvh] sm:h-[850px] sm:max-h-[95vh] sm:w-[400px] sm:rounded-[40px] sm:border-[8px] sm:border-gray-900 sm:shadow-2xl sm:overflow-hidden relative bg-[var(--color-bg)] flex flex-col">
        
        {/* Simulated iOS Status Bar (Visible only on Desktop Mockup) */}
        <div className="hidden sm:flex justify-between items-center px-6 pt-3 pb-1 text-xs font-medium text-gray-800 z-50 bg-[var(--color-bg)]/80 backdrop-blur-md absolute top-0 left-0 right-0">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-3 bg-gray-800 rounded-sm"></div>
            <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
            <div className="w-5 h-3 bg-gray-800 rounded-sm"></div>
          </div>
        </div>

        {/* Main Scrollable Content */}
        <main className="flex-1 w-full h-full overflow-y-auto pb-[80px] sm:pt-[24px] relative hide-scrollbar">
          <Outlet />
        </main>
        
        <BottomNav />
      </div>

      {/* Desktop Side Info (Hidden on Mobile) */}
      <div className="hidden lg:flex flex-col ml-16 max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <img src="/logo.png" alt="Etma'en Logo" className="w-12 h-12 object-contain" />
          <h1 className="text-4xl font-bold text-gray-900">Etma'en</h1>
        </div>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Unified Healthcare Record System. Centralizing patient medical records across hospitals, clinics, pharmacies, and labs.
        </p>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-[var(--color-primary)]">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-gray-900">Mobile-First Experience</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            You are viewing the web preview of the Etma'en mobile application. 
            Interact with the phone mockup to explore the features.
          </p>
        </div>
      </div>
    </div>
  );
}
