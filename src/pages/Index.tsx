import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, Trophy, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            TruthLens
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Gamify fact-checking. Detect lies. Learn truth.
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Join the ultimate multiplayer fact-checking challenge. Compete with players worldwide to identify real vs fake news, earn rewards, and become a Truth Detective!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/auth">
              <Button size="lg" className="text-lg px-8">
                Get Started
              </Button>
            </Link>
            <Link to="/lobby">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Play Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <Zap className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Real-Time Challenges</CardTitle>
              <CardDescription>
                Face news articles in intense multiplayer matches with countdown timers
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <Users className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Multiplayer Rooms</CardTitle>
              <CardDescription>
                Join lobbies with players worldwide and compete for the highest accuracy
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <Trophy className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Earn Rewards</CardTitle>
              <CardDescription>
                Collect coins, XP, badges and climb the global leaderboard
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <Shield className="w-8 h-8 text-primary mb-2" />
              <CardTitle>AI-Powered</CardTitle>
              <CardDescription>
                Learn from AI explanations and improve your fact-checking skills
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* How It Works */}
        <div className="text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto">
                1
              </div>
              <h3 className="text-xl font-semibold">Join a Room</h3>
              <p className="text-muted-foreground">
                Enter a multiplayer lobby and get matched with other fact-checkers
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto">
                2
              </div>
              <h3 className="text-xl font-semibold">Vote Real or Fake</h3>
              <p className="text-muted-foreground">
                Read news articles and decide if they're real or fake before time runs out
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto">
                3
              </div>
              <h3 className="text-xl font-semibold">Learn & Earn</h3>
              <p className="text-muted-foreground">
                See AI explanations, earn points, and climb the leaderboard
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
