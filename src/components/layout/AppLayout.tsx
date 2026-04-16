import { Outlet } from "react-router-dom";
import { BottomNav } from "./BottomNav";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col md:flex-row">
      <BottomNav />
      <main className="flex-1 w-full max-w-[430px] md:max-w-4xl lg:max-w-6xl mx-auto pb-[80px] md:pb-6 md:pl-64 relative transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
}
