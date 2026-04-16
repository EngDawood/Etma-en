import { NavLink } from "react-router-dom";
import { Home, Pill, FileText, Bot, User } from "lucide-react";
import { cn } from "../../lib/utils";

export function BottomNav() {
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/meds", icon: Pill, label: "Meds" },
    { to: "/records", icon: FileText, label: "Records" },
    { to: "/ai", icon: Bot, label: "AI" },
    { to: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe pt-2 px-4 z-50 md:top-0 md:bottom-0 md:w-64 md:border-t-0 md:border-r md:flex-col md:px-0 md:pt-0 md:shadow-sm">
      <div className="hidden md:flex items-center gap-2 p-6 border-b border-gray-100">
        <img src="/logo.png" alt="Etma'en Logo" className="w-8 h-8 object-contain" />
        <span className="font-bold text-xl text-[var(--color-primary)]">Etma'en</span>
      </div>
      <div className="max-w-[430px] mx-auto flex justify-between items-center md:max-w-none md:flex-col md:items-stretch md:justify-start md:h-[calc(100%-80px)] md:px-4 md:py-6 md:gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center p-2 min-w-[64px] transition-all rounded-xl md:flex-row md:px-4 md:py-3 md:gap-4 md:items-center",
                isActive 
                  ? "text-[var(--color-primary)] md:bg-[var(--color-primary-light)] md:font-semibold" 
                  : "text-[var(--color-text-secondary)] hover:bg-gray-50 md:hover:bg-gray-50"
              )
            }
          >
            <item.icon className={cn("w-6 h-6 mb-1 md:mb-0 transition-transform", "group-hover:scale-110")} />
            <span className="text-[10px] md:text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
