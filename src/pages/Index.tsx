import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-2xl">
        <Shield className="w-16 h-16 text-primary mx-auto" />
        <h1 className="text-6xl font-bold">TruthLens</h1>
        <p className="text-xl text-muted-foreground">
          AI-powered fact-checking tool
        </p>
        <p className="text-muted-foreground">
          Verify news articles and statements with AI analysis
        </p>
        <Link to="/check">
          <Button size="lg">Start Checking</Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
