import { Outlet } from "react-router-dom";
import { BottomNav } from "./BottomNav";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col">
      <main className="flex-1 w-full max-w-[430px] mx-auto pb-[80px] relative">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
