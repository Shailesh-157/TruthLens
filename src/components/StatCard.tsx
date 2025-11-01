import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  iconColor: string;
}

export function StatCard({ title, value, description, icon: Icon, iconColor }: StatCardProps) {
  return (
    <Card className="bg-[hsl(220,30%,13%)] border-border/40 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="text-sm text-muted-foreground">{title}</div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="text-3xl font-bold text-foreground mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{description}</div>
    </Card>
  );
}
