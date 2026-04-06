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
    <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe pt-2 px-4 z-50">
      <div className="max-w-[430px] mx-auto flex justify-between items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center p-2 min-w-[64px] transition-colors",
                isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text-secondary)]"
              )
            }
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
