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
          Gamify fact-checking. Detect lies. Learn truth.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/auth">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link to="/lobby">
            <Button size="lg" variant="outline">Play Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
