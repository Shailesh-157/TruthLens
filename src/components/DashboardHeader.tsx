import { Search, Sun, Bell, Moon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

export function DashboardHeader() {
  const [isDark, setIsDark] = useState(true);

  return (
    <header className="h-20 bg-[hsl(220,35%,12%)] border-b border-border/40 flex items-center px-8 gap-8">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search news to verify..."
          className="pl-10 bg-[hsl(220,30%,15%)] border-border/40 focus-visible:ring-cyan-400/50"
        />
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDark(!isDark)}
          className="text-muted-foreground hover:text-foreground"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </Button>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-medium text-foreground">Shailesh Pandey</div>
            <div className="text-xs text-muted-foreground">sp84233769@gmail.com</div>
          </div>
          <Avatar>
            <AvatarFallback className="bg-blue-500 text-white">SP</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
