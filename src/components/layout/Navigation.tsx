import { NavLink } from "react-router-dom";
import { Home, Pill, FileText, Bot, User } from "lucide-react";
import { cn } from "../../lib/utils";

export function Navigation() {
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/meds", icon: Pill, label: "Meds" },
    { to: "/records", icon: FileText, label: "Records" },
    { to: "/ai", icon: Bot, label: "AI Assistant" },
    { to: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <>
      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe pt-2 px-4 z-50">
        <div className="flex justify-between items-center">
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
              <span className="text-[10px] font-medium">{item.label === "AI Assistant" ? "AI" : item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 flex-col z-50 shadow-sm">
        <div className="p-6 flex items-center gap-3 border-b border-gray-100">
          <img src="/logo.png" alt="Etma'en Logo" className="w-8 h-8 object-contain" />
          <span className="text-xl font-bold text-[var(--color-primary)]">Etma'en</span>
        </div>
        <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium",
                  isActive 
                    ? "bg-[var(--color-primary)] text-[var(--color-primary)] bg-opacity-10" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </aside>
    </>
  );
}
