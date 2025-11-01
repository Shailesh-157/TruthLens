import { ReactNode } from "react";
import { Eye, Home, Clock, MessageSquare, Rocket, Info, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

const navItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Clock, label: "History", path: "/history" },
  { icon: MessageSquare, label: "Feedback", path: "/feedback" },
  { icon: Rocket, label: "Production", path: "/production" },
  { icon: Info, label: "About", path: "/about" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[hsl(220,30%,10%)] flex w-full">
      {/* Sidebar */}
      <aside className="w-60 bg-[hsl(220,35%,12%)] border-r border-border/40 flex flex-col">
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
            <Eye className="w-6 h-6 text-cyan-400" />
          </div>
          <span className="text-xl font-bold text-foreground">TruthLens</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-cyan-400/20 text-cyan-400"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 text-xs text-muted-foreground">
          © 2025 TruthLens
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
