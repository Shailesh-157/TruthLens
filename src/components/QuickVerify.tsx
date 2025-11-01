import { useState } from "react";
import { Search, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const tabs = ["Text/URL", "Image", "Audio", "Video"];

export function QuickVerify() {
  const [activeTab, setActiveTab] = useState("Text/URL");
  const [content, setContent] = useState("");

  return (
    <Card className="bg-[hsl(220,30%,13%)] border-border/40 p-8">
      <div className="flex items-center gap-2 mb-6">
        <Search className="w-5 h-5 text-cyan-400" />
        <h2 className="text-xl font-semibold text-foreground">Quick Verify</h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-6 py-2.5 rounded-lg font-medium transition-colors",
              activeTab === tab
                ? "bg-[hsl(220,30%,18%)] text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <Textarea
        placeholder="Paste news text or claim to verify..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[150px] bg-[hsl(220,30%,10%)] border-border/40 resize-none focus-visible:ring-cyan-400/50 mb-4"
      />

      {/* Switch Mode Button */}
      <button className="w-full bg-[hsl(220,30%,10%)] border border-border/40 rounded-lg py-3 mb-6 flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
        <Link2 className="w-4 h-4" />
        Switch to URL Mode
      </button>

      {/* Verify Button */}
      <Button
        className="w-full h-12 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-medium"
      >
        <Search className="w-5 h-5 mr-2" />
        Verify Now
      </Button>

      {/* Footer Text */}
      <p className="text-center text-xs text-muted-foreground mt-6">
        AI-powered verification for text, URLs, images, audio, and videos
      </p>
    </Card>
  );
}
