import { Search, Sun, Bell, Moon, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";

export function DashboardHeader() {
  const [isDark, setIsDark] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to log out");
    } else {
      toast.success("Logged out successfully");
      navigate("/auth");
    }
  };

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <header className="h-20 bg-sidebar-background border-b border-sidebar-border flex items-center px-8 gap-8">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search news to verify..."
          className="pl-10 bg-accent border-border focus-visible:ring-primary/50"
        />
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDark(!isDark)}
          className="text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </Button>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          {user && (
            <>
              <div className="text-right">
                <div className="text-sm font-medium text-sidebar-foreground">
                  {user.user_metadata?.full_name || "User"}
                </div>
                <div className="text-xs text-muted-foreground">{user.email}</div>
              </div>
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getInitials(user.email || "U")}
                </AvatarFallback>
              </Avatar>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
