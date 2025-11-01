import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";

const topics = [
  { name: "Climate Change News", verifications: 1234, avg: 78, trend: "up" },
  { name: "Tech Innovations", verifications: 987, avg: 92, trend: "up" },
  { name: "Health Claims", verifications: 756, avg: 45, trend: "down" },
  { name: "Political Statements", verifications: 654, avg: 67, trend: "up" },
];

export function TrendingTopics() {
  return (
    <Card className="bg-card border-border shadow-card p-6">
      <h2 className="text-xl font-semibold text-card-foreground mb-6">Trending Topics</h2>

      <div className="space-y-4">
        {topics.map((topic) => (
          <div key={topic.name} className="flex items-start gap-3">
            {topic.trend === "up" ? (
              <TrendingUp className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-card-foreground mb-1">{topic.name}</div>
              <div className="text-xs text-muted-foreground">
                {topic.verifications.toLocaleString()} verifications
              </div>
            </div>
            <div className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium whitespace-nowrap">
              {topic.avg}% avg
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
