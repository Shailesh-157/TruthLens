import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Loader2 } from "lucide-react";
import { toast } from "sonner";

// Sample analysis for demo
const analyzeText = (text: string) => {
  return new Promise<{ isReal: boolean; confidence: number; explanation: string }>((resolve) => {
    setTimeout(() => {
      const hasKeywords = text.toLowerCase().includes("scientists") || 
                         text.toLowerCase().includes("study") ||
                         text.toLowerCase().includes("research");
      
      resolve({
        isReal: hasKeywords,
        confidence: hasKeywords ? 85 : 45,
        explanation: hasKeywords 
          ? "This text contains verifiable references to scientific research and uses credible language patterns commonly found in legitimate news sources."
          : "This text lacks specific citations and uses sensational language without credible sources. Approach with caution and verify through official sources."
      });
    }, 2000);
  });
};

const Check = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ isReal: boolean; confidence: number; explanation: string } | null>(null);

  const handleCheck = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text to check");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const analysis = await analyzeText(text);
      setResult(analysis);
    } catch (error) {
      toast.error("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setText("");
    setResult(null);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto max-w-3xl py-8 space-y-6">
        <div className="text-center space-y-2">
          <Shield className="w-12 h-12 text-primary mx-auto" />
          <h1 className="text-3xl font-bold">TruthLens</h1>
          <p className="text-sm text-muted-foreground">Paste text or a news article to verify</p>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <Textarea
              placeholder="Paste news article or statement here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[200px] resize-none"
              disabled={loading}
            />
            
            {!result ? (
              <Button 
                onClick={handleCheck} 
                className="w-full" 
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Check Fact"
                )}
              </Button>
            ) : (
              <div className="space-y-4 pt-4 border-t">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Result:</span>
                    <span className={result.isReal ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                      {result.isReal ? "Likely Real" : "Likely Fake"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Confidence:</span>
                    <span>{result.confidence}%</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <span className="font-semibold text-sm">Analysis:</span>
                  <p className="text-sm text-muted-foreground">{result.explanation}</p>
                </div>

                <Button onClick={handleReset} variant="outline" className="w-full">
                  Check Another
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-xs text-center text-muted-foreground">
          This is a demo tool. Always verify important information with official sources.
        </p>
      </div>
    </div>
  );
};

export default Check;
