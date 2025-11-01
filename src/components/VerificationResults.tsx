import { CheckCircle, XCircle, AlertTriangle, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface VerificationResultsProps {
  truthScore: number;
  classification: "real" | "fake" | "unverified";
  analysis: string;
  factCheckLinks: Array<{ source: string; url: string }>;
  highlights?: string[];
}

export function VerificationResults({
  truthScore,
  classification,
  analysis,
  factCheckLinks,
  highlights = [],
}: VerificationResultsProps) {
  const getStatusConfig = () => {
    if (classification === "real") {
      return {
        icon: CheckCircle,
        color: "text-green-400",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/20",
        label: "Verified True",
        description: "This content appears to be factually accurate",
      };
    } else if (classification === "fake") {
      return {
        icon: XCircle,
        color: "text-red-400",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/20",
        label: "Likely Fake",
        description: "This content contains misleading or false information",
      };
    } else {
      return {
        icon: AlertTriangle,
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/10",
        borderColor: "border-yellow-500/20",
        label: "Unverified",
        description: "Unable to verify the accuracy of this content",
      };
    }
  };

  const config = getStatusConfig();
  const StatusIcon = config.icon;

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Truth Score Card */}
      <Card className="bg-card border-border shadow-elegant p-8">
        <div className="flex items-start gap-6">
          <div className={`p-4 rounded-xl ${config.bgColor} ${config.borderColor} border-2`}>
            <StatusIcon className={`w-12 h-12 ${config.color}`} />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-bold text-card-foreground">{config.label}</h3>
              <Badge className={`${config.bgColor} ${config.color} border-0 text-lg px-4 py-1`}>
                {truthScore}% Confidence
              </Badge>
            </div>
            <p className="text-muted-foreground mb-4">{config.description}</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Truth Score</span>
                <span className="font-medium">{truthScore}%</span>
              </div>
              <Progress value={truthScore} className="h-3" />
            </div>
          </div>
        </div>
      </Card>

      {/* Analysis Card */}
      <Card className="bg-card border-border shadow-card p-6">
        <h4 className="text-lg font-semibold text-card-foreground mb-3">
          AI Analysis
        </h4>
        <p className="text-muted-foreground leading-relaxed">{analysis}</p>
      </Card>

      {/* Highlighted Concerns */}
      {highlights.length > 0 && (
        <Card className="bg-card border-border shadow-card p-6">
          <h4 className="text-lg font-semibold text-card-foreground mb-3">
            Detected Concerns
          </h4>
          <ul className="space-y-2">
            {highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-2 text-muted-foreground">
                <span className="text-yellow-400 mt-1">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Fact-Check Sources */}
      {factCheckLinks.length > 0 && (
        <Card className="bg-card border-border shadow-card p-6">
          <h4 className="text-lg font-semibold text-card-foreground mb-4">
            Verification Sources
          </h4>
          <div className="space-y-3">
            {factCheckLinks.map((link, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-between border-border hover:bg-accent"
                asChild
              >
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <span>{link.source}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            ))}
          </div>
        </Card>
      )}

      {/* Feedback Section */}
      <Card className="bg-card border-border shadow-card p-6">
        <h4 className="text-lg font-semibold text-card-foreground mb-3">
          Was this result helpful?
        </h4>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 border-border hover:bg-accent">
            👍 Accurate
          </Button>
          <Button variant="outline" className="flex-1 border-border hover:bg-accent">
            👎 Inaccurate
          </Button>
        </div>
      </Card>
    </div>
  );
}
