import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex font-sans">
      <Navigation />
      
      {/* Main Content Area */}
      <main className="flex-1 w-full md:ml-64 pb-[80px] md:pb-0 min-h-screen flex flex-col relative">
        <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
